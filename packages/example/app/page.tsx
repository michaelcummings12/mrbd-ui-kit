"use client";

import { Text, Button, LoadingIndicator, Icon, Focusable } from "mrbd-ui-kit";
import { Check, X } from "lucide-react";

export default function HomeTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Text size="lg" weight="bold">
          mrbd-ui-kit
        </Text>
        <Text size="xs" dim>
          The easiest way to build an app for Meta Ray-Ban Display
        </Text>
      </div>
      <Button id={"card"} className="w-full">
        <div className="flex flex-row gap-2 items-center">
          <div className="w-8 h-8 rounded-full bg-mrbd-accent/20 flex items-center justify-center">
            <Icon icon={Check} size={16} color="var(--color-mrbd-accent)" />
          </div>
          <div className="flex flex-col">
            <Text weight="semibold">New message from Alex</Text>
            <Text size="sm" dim>
              Hey, are you free for lunch?
            </Text>
          </div>
        </div>
      </Button>

      <div className="flex flex-row gap-3 w-full">
        <Button
          id="accept-btn"
          variant="primary"
          icon={Check}
          className="w-full"
        >
          Accept
        </Button>
        <Button id="decline-btn" variant="ghost" icon={X} className="w-full">
          Decline
        </Button>
      </div>

      <div className="flex flex-col items-center">
        <LoadingIndicator variant="spinner" size={24} />
      </div>
    </div>
  );
}
