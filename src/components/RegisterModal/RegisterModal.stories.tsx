import type { Meta, StoryObj } from "@storybook/react";

import { RegisterModalInner } from "./RegisterModal";
import { action } from "@storybook/addon-actions";
import { useForm } from "react-hook-form";
import { Inputs } from "./ConnectedRegisterModal";

const meta: Meta<typeof RegisterModalInner> = {
  title: "components/RegisterModal",
  component: RegisterModalInner,
  // ...
};

const Component = meta.component!;

export default meta;

type Story = StoryObj<typeof RegisterModalInner>;

export const Default: Story = {
  args: {
    onRegister: action("onRegister"),
    close: action("close"),
  },
  render: (...args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const form = useForm<Inputs>();

    return (
      <div className="flex justify-center mt-8">
        <div className="w-1/2">
          <Component {...(args as any)} form={form} />
        </div>
      </div>
    );
  },
};
