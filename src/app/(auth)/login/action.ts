import { loginWithEmail } from "@/lib/auth";
import { redirect } from "next/navigation";
import { success, z } from "zod";

const schema = z.object({
  email: z.email({ message: "이메일 형식이 올바르지 않습니다." }),
  password: z.string({ error: "비밀번호를 입력해주세요." }),
});

export type loginValues = {
  email?: string;
  password?: string;
};

export type LoginState = {
  success: boolean;
  message?: string;
  errors?: Partial<Record<keyof z.infer<typeof schema>, string[]>>;
  values?: loginValues;
};

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const values = {
    email: formData.get("email")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
  };

  const parsed = schema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "입력값을 확인해주세요.",
      errors: parsed.error.flatten().fieldErrors,
      values: {
        email: values.email,
        password: values.password,
      },
    };
  }

  const { email, password } = parsed.data;

  const res = await loginWithEmail(email, password);

  if (!res.ok) {
    if (res.status === 404) {
      return {
        success: false,
        message: "이메일이 올바르지 않습니다.",
        errors: {
          email: ["존재하지 않는 이메일입니다."],
        },
        values: {
          email,
        },
      };
    } else if (res.status === 401) {
      return {
        success: false,
        message: "비밀번호가 올바르지 않습니다.",
        errors: {
          password: ["비밀번호가 올바르지 않습니다."],
        },
        values: {
          email,
        },
      };
    }
  }

  redirect("/");
}
