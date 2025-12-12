"use client";

import { useState } from "react";
import { CircleAlert, ChevronDown } from "lucide-react";
import TextInput from "@/components/common/TextInput";
import Dropdown from "@/components/common/Dropdown";
import { BoxButton } from "@/components/common/button/BoxButton";

export interface FormModalProps {
  /** 모달 오픈 여부 */
  isOpen: boolean;

  /** 모달 닫기 함수 */
  onClose: () => void;

  /** 폼 제출 시 실행될 함수. formData 제공 */
  onSubmit?: (formData: FormData) => void | Promise<void>;
}

const items = [
  { value: "lol", label: "리그 오브 레전드" },
  { value: "overwatch", label: "오버 워치" },
  { value: "valorant", label: "발로란트" },
];

export default function FormModal({ isOpen, onSubmit, onClose }: FormModalProps) {
  const [value, setValue] = useState("lol");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await onSubmit?.(formData);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-bg-secondary h-114 w-123 rounded-xl p-7.5 text-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-7.5 flex items-center justify-between">
          <h2 className="text-content-primary text-2xl font-semibold">
            게임 아이디 연동
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* 게임 종류 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="text-content-secondary text-sm">
              게임 종류
            </label>
            <Dropdown
              placeholder="리그 오브 레전드"
              items={items}
              className="rounded-md text-sm"
              value={value}
              onValueChange={setValue}
            />
            {/* formData로 전달하기 위한 hidden input */}
            <input type="hidden" name="game" value={value} />
          </div>

          {/* 닉네임 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nickname"
              className="text-content-secondary text-sm"
            >
              닉네임
            </label>
            <TextInput
              name="nickname"
              id="nickname"
              placeholder="닉네임"
              className="outline-border-primary h-10 rounded-xl px-4 py-2 text-sm outline-1 outline-solid"
            />
          </div>

          {/* 태그 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="tag" className="text-content-secondary text-sm">
              태그
            </label>
            <TextInput
              name="tag"
              id="tag"
              placeholder="#을 뺀 숫자만 입력해주세요"
              className="outline-border-primary h-10 rounded-xl px-4 py-2 text-sm outline-1 outline-solid"
            />
          </div>

          {/* 안내 문구 */}
          <div className="text-negative flex items-center gap-2 text-base">
            <CircleAlert size={18} />
            <p>
              타인의 아이디를 도용하는 경우 서비스 이용이 제한될 수 있습니다
            </p>
          </div>

          <div className="mt-4.5 flex justify-end gap-3">
            <BoxButton
              tone="color"
              type="submit"
              text="연동"
              className="h-9 w-15.5 rounded-xl px-4 py-2 text-sm font-semibold"
            />

            <BoxButton
              tone="black"
              type="button"
              text="닫기"
              onClick={onClose}
              className="h-9 w-15.5 rounded-xl px-4 py-2 text-sm font-semibold"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
