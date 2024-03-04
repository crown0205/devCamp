"use client";
import ErrorText from "@/components/atom/text/ErrorText";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { userSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { get } from "http";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type IUserSchema = z.infer<typeof userSchema>;
type IStep = "info" | "password";

export default function Home() {
  const [step, setStep] = useState<IStep>("info");

  // TODO : 필요없은 기능 제거
  const {
    register,
    control,
    getValues,
    formState: { errors },
    clearErrors,
    handleSubmit,
  } = useForm<IUserSchema>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
    shouldFocusError: false,
  });
  const { toast } = useToast();

  const onNext = () => {
    console.log("click");

    handleSubmit((data) => {})() //
      .then(() => {
        const { name, email, phone, roles } = errors;
        const {
          name: nameValue,
          email: emailValue,
          phone: phoneValue,
          roles: rolesValue,
        } = getValues();

        if (
          !nameValue ||
          !emailValue ||
          !phoneValue ||
          rolesValue === undefined
        ) {
          return;
        }

        clearErrors();
        setStep("password");
      });
  };

  const onPrev = () => {
    setStep("info");
  };

  const handleSignup = () => {
    console.log("signup");
    const { password, passwordConfirm } = errors;
    if (password || passwordConfirm) return;

    if (getValues("password") !== getValues("passwordConfirm")) {
      toast({
        variant: "destructive",
        title: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }

    alert(JSON.stringify(getValues(), null, 2));
  };

  useEffect(() => {
    console.log(getValues());
  }, [getValues]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>계정을 생성합니다.</CardTitle>
          <CardDescription>필수 정보를 입력해볼게요.</CardDescription>
        </CardHeader>

        <form action="none">
          <div className={clsx("flex transition overflow-hidden")}>
            <CardContent
              className={clsx(
                "pb-0 min-w-full",
                step === "info" ? "-translate-x-0" : "translate-x-[-100%]"
              )}
            >
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 gap-1">
                  <Label
                    className={clsx(errors?.name && "text-red-500")}
                    htmlFor="name"
                  >
                    이름
                  </Label>
                  <Input id="name" placeholder="홍길동" {...register("name")} />
                  {errors?.name && (
                    <ErrorText className="text-red-500 font-semibold">
                      {errors.name?.message}
                    </ErrorText>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5 gap-1">
                  <Label
                    className={clsx(errors?.email && "text-red-500")}
                    htmlFor="email"
                  >
                    이메일
                  </Label>
                  <Input
                    id="email"
                    placeholder="hello@sparta-devcamp.com"
                    {...register("email")}
                  />
                  {errors?.email && (
                    <ErrorText className="text-red-500 font-semibold">
                      {errors.email?.message}
                    </ErrorText>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5 gap-1">
                  <Label
                    className={clsx(errors.phone && "text-red-500")}
                    htmlFor="phone"
                  >
                    연락처
                  </Label>
                  <Input
                    id="phone"
                    placeholder="01000000000"
                    {...register("phone")}
                  />
                  {errors?.phone && (
                    <ErrorText className="text-red-500 font-semibold">
                      {errors.phone?.message}
                    </ErrorText>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5 gap-1">
                  <Label
                    className={clsx(errors.roles && "text-red-500")}
                    htmlFor="roles"
                  >
                    역할
                  </Label>
                  <Controller
                    name="roles"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger id="roles" ref={field.ref}>
                          <SelectValue placeholder="역할을 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">관리자</SelectItem>
                          <SelectItem value="user">일반 사용자</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors?.roles && (
                    <ErrorText className="text-red-500 font-semibold">
                      {errors.roles?.message}
                    </ErrorText>
                  )}
                </div>
              </div>
            </CardContent>
            <CardContent
              className={clsx(
                "flex flex-col gap-4 min-w-full",
                step === "password" ? "-translate-x-[100%]" : "translate-x-0"
              )}
            >
              <div className="flex flex-col space-y-1.5 gap-1">
                <Label
                  className={clsx(errors.password && "text-red-500")}
                  htmlFor="password"
                >
                  비밀번호
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder=""
                  {...register("password")}
                />
                {errors?.password && (
                  <ErrorText className="text-red-500 font-semibold">
                    {errors.password?.message}
                  </ErrorText>
                )}
              </div>
              <div className="flex flex-col space-y-1.5 gap-1">
                <Label
                  className={clsx(errors.passwordConfirm && "text-red-500")}
                  htmlFor="passwordConfirm"
                >
                  비밀번호 확인
                </Label>
                <Input
                  type="password"
                  id="passwordConfirm"
                  placeholder=""
                  {...register("passwordConfirm")}
                />
                {errors?.passwordConfirm && (
                  <ErrorText className="text-red-500 font-semibold">
                    {errors.passwordConfirm?.message}
                  </ErrorText>
                )}
              </div>
            </CardContent>
          </div>
        </form>

        <CardFooter className="flex justify-start gap-2 mt-3">
          {step === "info" ? (
            <Button
              onClick={onNext}
              className={clsx(
                "flex items-center gap-2",
                step !== "info" && "hidden"
              )}
            >
              다음 단계로 <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <>
              <Button className="flex" onClick={handleSignup}>
                계정 등록하기
              </Button>
              <Button variant="secondary" onClick={onPrev}>
                이전 단계로
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </main>
  );
}
