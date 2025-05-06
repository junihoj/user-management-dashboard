"use client";

import { CustomField } from "@/components/globals/custom-field";
import { ProgressBarLink } from "@/components/globals/progress-bar-link";
import ErrorText from "@/components/typograhpy/error-text";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/ui/custom-input";
import { Form } from "@/components/ui/form";
import { authInputIconClassName } from "@/constants";
import { apiService } from "@/lib/api-service";
import { Alert } from "@/lib/helpers/alert";
import { cn, handleError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginFormSchema = z.object({
  email: z.string().trim().email("Invalid Email Address"),
  password: z.string().min(1, "Password is required"),
});
const LoginForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const signInReq = useMutation({
    mutationFn: async (data: any) => {
      return apiService({
        url: "/api/v1/auth/login",
        data,
        method: "post",
        // otherConfig: { withCredentials: true },
      });
    },
    onSuccess(res: AxiosResponse, _variables, _context) {
      const nextUrl = searchParams.get("next");
      if (res?.data?.success) {
        Alert.success(
          res?.data?.data?.message || "Profile Updated Successfully"
        );
      }
      router.replace(nextUrl || "/");
    },
    onError(error: Error | AxiosError, _variables, _context) {
      handleError(error);
    },
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof LoginFormSchema>) => {
    signInReq.mutate({ ...values });
  };
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <React.Suspense>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-y-8"
        >
          {/* inputs */}
          <div className="flex flex-col gap-y-6 w-full">
            <CustomField
              className="flex-1 w-full"
              control={form.control}
              name="email"
              formLabel="Email"
              labelClass="text-gray-800"
              render={({ field }) => (
                <CustomInput
                  {...field}
                  placeholder="Email"
                  error={form.formState.errors.email}
                  className={cn({
                    "border-error": form.formState.errors?.email,
                  })}
                />
              )}
              schema={LoginFormSchema}
            />
            <div>
              <CustomField
                className="flex-1"
                control={form.control}
                name="password"
                formLabel="Password"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    error={form.formState.errors.password}
                    type={showPassword ? "text" : "password"}
                    placeholder="enter password"
                  />
                )}
                iconClassName="cursor-pointer"
                icon={
                  showPassword ? (
                    <EyeClosed
                      onClick={togglePasswordVisibility}
                      className={`${authInputIconClassName}`}
                    />
                  ) : (
                    <Eye
                      onClick={togglePasswordVisibility}
                      className={`${authInputIconClassName}`}
                    />
                  )
                }
                schema={LoginFormSchema}
              />
              <div className="flex justify-end">
                <ProgressBarLink
                  href={`/auth/forgot-password`}
                  className="font-semibold text-golden-solid text-[0.8125rem] leading-[1.375rem] cursor-pointer"
                >
                  create New Account
                </ProgressBarLink>
              </div>
            </div>
            {errorMessage && <ErrorText message={errorMessage} />}
          </div>

          {/* action button */}
          <Button
            className="bg-primary-black rounded-2xl w-full font-medium text-[0.9375rem] py-[0.875rem]"
            loading={signInReq.isPending}
            loadingText="signing user in..."
          >
            Login
          </Button>
        </form>
      </Form>
    </React.Suspense>
  );
};

export default LoginForm;
