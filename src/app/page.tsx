"use client";
import FormInput from "@/components/molecules/FormInput";
import FormSelect from "@/components/molecules/FormSelect";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { infoSchema, passwordSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ISchema = z.infer<typeof infoSchema & typeof passwordSchema>;
type IStep = "info" | "password";

export default function Home() {
  const [step, setStep] = useState<IStep>("info");
  const [animationCardWidth, setAnimationCardWidth] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const currentSchema = step === "info" ? infoSchema : passwordSchema;

  const form = useForm<ISchema>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      roles: "",
      password: "",
      passwordConfirm: "",
    },
    mode: "onChange",
    shouldFocusError: false,
  });
  const {
    register,
    control,
    getValues,
    formState: { errors },
    handleSubmit,
  } = form;
  const { toast } = useToast();

  const onSubmit = (data: ISchema) => {
    console.log({ data });

    if (step === "info") {
      onNext();
    }

    if (step === "password") {
      handleSignup(data);
    }
  };

  const onNext = () => {
    setStep("password");
  };

  const onPrev = () => {
    setStep("info");
  };

  const handleSignup = (data: ISchema) => {
    const { password, passwordConfirm } = errors;
    const { password: passwordValue, passwordConfirm: passwordConfirmValue } =
      data;

    if (passwordValue !== passwordConfirmValue) {
      // if (password || passwordConfirm || passwordValue !== passwordConfirmValue) {
      toast({
        variant: "destructive",
        title: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }

    alert(JSON.stringify(getValues(), null, 2));
  };

  const infoConstants = [
    {
      id: "name",
      label: "이름",
      placeholder: "홍길동",
      error: errors?.name,
    },
    {
      id: "email",
      label: "이메일",
      placeholder: "hello@sparta-devcamp.com",
      error: errors?.email,
    },
    {
      id: "phone",
      label: "연락처",
      placeholder: "01000000000",
      error: errors?.phone,
    },
  ];

  const passwordConstants = [
    {
      id: "password",
      type: "password",
      label: "비밀번호",
      error: errors?.password,
    },
    {
      id: "passwordConfirm",
      type: "password",
      label: "비밀번호 확인",
      error: errors?.passwordConfirm,
    },
  ];

  useEffect(() => {
    if (cardRef.current) {
      setAnimationCardWidth(cardRef.current.offsetWidth);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>계정을 생성합니다.</CardTitle>
          <CardDescription>필수 정보를 입력해볼게요.</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full overflow-hidden relative"
          >
            <div className={clsx("flex")}>
              <motion.div
                animate={{
                  x: step === "info" ? 0 : -animationCardWidth,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex w-full min-w-full"
              >
                <CardContent
                  className={clsx("pb-0 w-full flex flex-col gap-4")}
                  ref={cardRef}
                >
                  {infoConstants.map((constant) => (
                    <FormInput
                      key={constant.id}
                      id={constant.id}
                      control={control}
                      label={constant.label}
                      placeholder={constant.placeholder}
                    />
                  ))}
                  <FormSelect
                    id="roles"
                    label="역할"
                    control={control}
                    placeholder="역할을 선택해주세요"
                    option={[
                      { label: "관리자", value: "admin" },
                      { label: "일반 사용자", value: "user" },
                    ]}
                  />
                </CardContent>
              </motion.div>
              <motion.div
                animate={{
                  x: step === "password" ? -animationCardWidth : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex w-full min-w-full"
              >
                <CardContent className={clsx("flex flex-col gap-4 min-w-full")}>
                  {passwordConstants.map((constant) => {
                    return (
                      <FormInput
                        key={constant.id}
                        control={control}
                        id={constant.id}
                        type={constant.type as "password"}
                        label={constant.label}
                      />
                    );
                  })}
                </CardContent>
              </motion.div>
            </div>
            <CardFooter className="flex justify-start gap-2 mt-3">
              {step === "info" ? (
                <Button
                  type="submit"
                  className={clsx("flex items-center gap-2")}
                >
                  다음 단계로 <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <>
                  <Button className="flex" type="submit">
                    계정 등록하기
                  </Button>
                  <Button variant="secondary" onClick={onPrev}>
                    이전 단계로
                  </Button>
                </>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
}
