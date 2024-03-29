"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Input from "@/components/custom/Input";
import { useForm } from "react-hook-form";
import { SignupSchemaType, signupSchema } from "@/schemas/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignup } from "@/api/auth";
import { AuthCard } from ".";

export default function SignupForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: yupResolver(signupSchema),
  });

  const { isPending, mutate } = useSignup();

  const onSubmit = (data: SignupSchemaType) => {
    mutate(data);
  };
  return (
    <AuthCard title="Welcome" subtitle="Complete details to sign in">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-16 space-y-7">
        <Input
          errors={errors}
          label="First Name"
          placeholder="Enter Your First Name"
          name="firstName"
          // @ts-ignore
          control={control}
        />
        <Input
          errors={errors}
          label="Last Name"
          placeholder="Enter Your Last Name"
          name="lastName"
          // @ts-ignore
          control={control}
        />
        <Input
          errors={errors}
          label="Email"
          placeholder="Enter Your Email"
          name="email"
          // @ts-ignore
          control={control}
        />

        <Input
          errors={errors}
          label="Password"
          placeholder="Enter Your Password"
          // @ts-ignore
          control={control}
          name="password"
          type="password"
        />
        <Input
          errors={errors}
          label="Confirm Password"
          placeholder="Confirm Your Password"
          // @ts-ignore
          control={control}
          name="confirmPassword"
          type="password"
        />

        <Button
          className="justify-center w-full p-6 bg-secondary rounded shadow"
          type="submit"
          isLoading={isPending}
        >
          Submit
        </Button>

        <p className="text-center text-zinc-900 text-sm font-normal leading-snug">
          Don’t have an account yet?{" "}
          <Link
            href="/auth/sign-up"
            className=" text-indigo-800 text-sm font-semibold underline leading-snug"
          >
            Create one
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
