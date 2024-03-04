"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formValues } from "@/types";
//
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type IFormValues = z.infer<typeof formValues>;

export default function Home() {
  const [step, setStep] = useState();

  const { handleSubmit, register } = useForm<IFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      roles: "",
    },
  });

  const onSubmit = (data: IFormValues) => {
    console.log(data);
  };

  const handleNext = () => {};

  const handlePrev = () => {};

  const handleSignup = () => {
    console.log("signup");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>계정을 생성합니다.</CardTitle>
          <CardDescription>필수 정보를 입력해볼게요.</CardDescription>
        </CardHeader>

        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <CardContent className="pb-0">
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5 gap-1">
                      <Label htmlFor="name">이름</Label>
                      <Input id="name" placeholder="홍길동" />
                    </div>
                    <div className="flex flex-col space-y-1.5 gap-1">
                      <Label htmlFor="email">이메일</Label>
                      <Input
                        id="email"
                        placeholder="hello@sparta-devcamp.com"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5 gap-1">
                      <Label htmlFor="phone">연락처</Label>
                      <Input id="phone" placeholder="01000000000" />
                    </div>
                    <div className="flex flex-col space-y-1.5 gap-1">
                      <Label htmlFor="roles">역활</Label>
                      <Select>
                        <SelectTrigger id="roles">
                          <SelectValue placeholder="역할을 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="admin">관리자</SelectItem>
                          <SelectItem value="user">일반 사용자</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </form>
              </CardContent>
            </CarouselItem>

            <CarouselItem>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col space-y-1.5 gap-1">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input id="password" placeholder="01000000000" />
                </div>
                <div className="flex flex-col space-y-1.5 gap-1">
                  <Label htmlFor="passwordCheck">비밀번호 확인</Label>
                  <Input id="passwordCheck" placeholder="01000000000" />
                </div>
              </CardContent>
            </CarouselItem>
          </CarouselContent>
          <CardFooter className="flex justify-between mt-3">
            <Button>다음 단계로 ➡️</Button>
            {/* <CarouselPrevious className="relative"></CarouselPrevious> */}
            {/* <CarouselNext /> */}
          </CardFooter>
        </Carousel>
      </Card>
    </main>
  );
}
