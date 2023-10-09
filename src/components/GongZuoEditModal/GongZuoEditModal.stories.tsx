import type { Meta, StoryObj } from "@storybook/react";

import { GongZuoEditModal } from "./GongZuoEditModal";
import { action } from "@storybook/addon-actions";
import { useForm } from "react-hook-form";
import { Inputs } from "./ConnectedGongZuoEditModal";

const meta: Meta<typeof GongZuoEditModal> = {
  title: "components/GongZuoTimeline",
  component: GongZuoEditModal,
  // ...
};

const Component = meta.component!;

export default meta;

type Story = StoryObj<typeof GongZuoEditModal>;

export const Default: Story = {
  args: {
    onSubmit: action("onSubmit"),
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
