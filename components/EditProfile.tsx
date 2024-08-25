"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserInfo } from "@/app/(home)/(tabs)/users/[id]/edit/page";
import {
  updateUserProfile,
  userSchema,
} from "@/app/(home)/(tabs)/users/[id]/edit/actions";
import {
  EnvelopeIcon as EnvelopeIconLine,
  KeyIcon as KeyIconLine,
  LockClosedIcon as LockClosedIconLine,
  UserIcon as UserIconLine,
  FaceSmileIcon as FaceSmileIconLine,
} from "@heroicons/react/24/outline";
import { PhotoIcon as PhotoIconFill } from "@heroicons/react/24/solid";
import Button from "./Button";
import Input from "./Input";

interface FormEditProfileProps {
  userInfo: UserInfo;
}

interface UserFormType {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  new_password: string;
  bio: string;
  avatar: string;
}

export default function EditProfile({ userInfo }: FormEditProfileProps) {
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: userInfo?.username,
      email: userInfo?.email ? userInfo?.email : undefined,
      bio: userInfo?.bio ? userInfo.bio : undefined,
      avatar: userInfo?.avatar ? userInfo.avatar : undefined,
    },
  });

  // 이미지 변경
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);
  };

  // 저장
  const onSubmit = handleSubmit(async (data: UserFormType) => {
    if (file) {
      const cloudflareForm = new FormData();
      cloudflareForm.append("file", file);
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: cloudflareForm,
      });
      if (response.status !== 200) {
        return;
      }
    }

    const formData = new FormData();
    formData.append("avatar", data.avatar);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("new_password", data.new_password);
    formData.append("confirm_password", data.confirm_password);
    formData.append("bio", data.bio);

    const errors = await updateUserProfile(formData);
    if (errors) {
      setError("password", { message: errors?.fieldErrors.password?.at(0) });
    }
  });

  const onValid = async () => {
    await onSubmit();
  };

  return (
    <form action={onValid} className="flex flex-col gap-2">
      <label
        htmlFor="avatar"
        className="relative flex flex-col self-center items-center justify-center gap-1 size-10 bg-cover border border-slate-300 rounded-full overflow-hidden cursor-pointer"
        style={{
          backgroundImage: `url(${preview})`,
        }}
      >
        {preview === "" && (
          <div
            className={`absolute top-0 left-0 flex flex-col items-center justify-center gap-1 w-full h-full rounded-full opacity-50 transition hover:opacity-100`}
          >
            <PhotoIconFill />
            <span className="text-xs text-center font-semibold">
              이미지 {userInfo?.avatar ? "변경" : "추가"}
            </span>
          </div>
        )}
      </label>

      <input
        onChange={onImageChange}
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
        className="hidden"
      />

      {errors.avatar?.message && (
        <p className="text-red-600">{errors.avatar.message}</p>
      )}

      <Input
        placeholder={userInfo?.username}
        {...register("username")}
        errors={errors.username?.message ? [errors.username.message] : []}
        icon={<UserIconLine className="absolute left-3 size-5" />}
      />

      <Input
        type="email"
        placeholder={userInfo?.email ? userInfo.email : "이메일을 추가해주세요"}
        {...register("email")}
        errors={errors.email?.message ? [errors.email.message] : []}
        icon={<EnvelopeIconLine className="absolute left-3 size-5" />}
      />

      <Input
        type="text"
        placeholder={
          userInfo?.bio ? userInfo.bio : "나를 표현하는 한줄을 작성해주세요."
        }
        {...register("bio")}
        errors={errors.bio?.message ? [errors.bio.message] : []}
        icon={<FaceSmileIconLine className="absolute left-3 size-5" />}
      />

      <Input
        type="password"
        placeholder="기존 비밀번호를 입력해주세요"
        {...register("password")}
        errors={errors.password?.message ? [errors.password.message] : []}
        icon={<LockClosedIconLine className="absolute left-3 size-5" />}
      />

      <Input
        type="password"
        placeholder="새로운 비밀번호를 입력해주세요"
        {...register("new_password")}
        errors={
          errors.new_password?.message ? [errors.new_password.message] : []
        }
        icon={<KeyIconLine className="absolute left-3 size-5" />}
      />

      <Input
        type="password"
        placeholder="새로운 비밀번호를 확인해주세요"
        {...register("confirm_password")}
        errors={
          errors.confirm_password?.message
            ? [errors.confirm_password.message]
            : []
        }
        icon={<KeyIconLine className="absolute left-3 size-5" />}
      />

      <Button text="저장"></Button>
    </form>
  );
}
