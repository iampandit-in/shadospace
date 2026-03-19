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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    };
  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your details to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" placeholder="Enter your email" />
          </Field>
          <Field className="-mt-2">
            <FieldLabel>Password</FieldLabel>
            <InputGroup>
              <InputGroupInput type={showPassword ? "text" : "password"} placeholder="********" />
              <InputGroupAddon className="cursor-pointer" align="inline-end">
                <Button variant={"ghost"} onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeIcon className="size-4 text-muted-foreground" /> : <EyeClosedIcon className="size-4 text-muted-foreground" />}
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <div className="flex items-center gap-2 -mt-2">
            <Separator className="flex-1" />
            <span className="text-sm text-muted-foreground">
              or continue with
            </span>
            <Separator className="flex-1" />
          </div>
          <Field className="flex items-center gap-2 -mt-2">
            <Button variant={"outline"} className="w-full">
              <Image
                className="size-4"
                src="/google.png"
                alt="Google"
                width={20}
                height={20}
              />
              Continue with google
            </Button>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="mt-2">
        <Field>
          <Button>Login</Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
