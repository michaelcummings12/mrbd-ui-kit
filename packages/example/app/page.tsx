"use client";

import { useState } from "react";
import {
  DisplayRoot,
  Text,
  Stack,
  Box,
  Button,
  NavigationBar,
  LoadingIndicator,
  Icon,
  Focusable,
} from "mrbd-ui-kit";

type Tab = "home" | "search" | "settings";

function HomeTab() {
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);

  return (
    <Stack direction="vertical" gap={4} className="p-6 pb-20">
      {/* Header */}
      <Stack direction="horizontal" gap={2} align="center">
        <Icon name="bell" size={20} color="var(--color-mrbd-accent)" />
        <Text size="lg" weight="bold">
          Notifications
        </Text>
        <div className="ml-auto">
          <Text size="xs" dim>
            2 new
          </Text>
        </div>
      </Stack>

      {/* Notification card 1 */}
      <Focusable id="notif-1">
        <Box surface rounded="lg" p={4}>
          <Stack gap={2}>
            <Stack direction="horizontal" gap={2} align="center">
              <div className="w-8 h-8 rounded-full bg-mrbd-accent/20 flex items-center justify-center">
                <Icon
                  name="check"
                  size={16}
                  color="var(--color-mrbd-accent)"
                />
              </div>
              <Stack gap={0}>
                <Text weight="semibold">New message from Alex</Text>
                <Text size="sm" dim>
                  Hey, are you free for lunch?
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Focusable>

      {/* Notification card 2 */}
      <Focusable id="notif-2">
        <Box surface rounded="lg" p={4}>
          <Stack direction="horizontal" gap={2} align="center">
            <div className="w-8 h-8 rounded-full bg-mrbd-success/20 flex items-center justify-center">
              <Icon
                name="check"
                size={16}
                color="var(--color-mrbd-success)"
              />
            </div>
            <Stack gap={0}>
              <Text weight="semibold">Run complete</Text>
              <Text size="sm" dim>
                5.2 km in 28:14
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Focusable>

      {/* Actions */}
      {!accepted ? (
        <Stack direction="horizontal" gap={3}>
          <Button
            id="accept-btn"
            variant="primary"
            icon="check"
            onPress={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setAccepted(true);
              }, 1500);
            }}
          >
            Accept
          </Button>
          <Button id="decline-btn" variant="ghost" icon="x" onPress={() => {}}>
            Decline
          </Button>
        </Stack>
      ) : (
        <Box surface rounded="lg" p={3}>
          <Stack direction="horizontal" gap={2} align="center">
            <Icon
              name="check"
              size={16}
              color="var(--color-mrbd-success)"
            />
            <Text size="sm" weight="semibold">
              Reply sent to Alex
            </Text>
          </Stack>
        </Box>
      )}

      {loading && (
        <Stack align="center">
          <LoadingIndicator variant="dots" size={24} />
        </Stack>
      )}
    </Stack>
  );
}

function SearchTab() {
  const items = ["Running", "Cycling", "Walking", "Swimming"];

  return (
    <Stack direction="vertical" gap={4} className="p-6 pb-20">
      <Stack direction="horizontal" gap={2} align="center">
        <Icon name="search" size={20} color="var(--color-mrbd-accent)" />
        <Text size="lg" weight="bold">
          Activities
        </Text>
      </Stack>

      {items.map((item, i) => (
        <Focusable key={item} id={`search-item-${i}`}>
          <Box surface rounded="lg" p={4}>
            <Stack direction="horizontal" align="center" justify="between">
              <Text weight="semibold">{item}</Text>
              <Icon
                name="chevron-right"
                size={16}
                color="var(--color-mrbd-text-dim)"
              />
            </Stack>
          </Box>
        </Focusable>
      ))}
    </Stack>
  );
}

function SettingsTab() {
  return (
    <Stack direction="vertical" gap={4} className="p-6 pb-20">
      <Stack direction="horizontal" gap={2} align="center">
        <Icon name="settings" size={20} color="var(--color-mrbd-accent)" />
        <Text size="lg" weight="bold">
          Settings
        </Text>
      </Stack>

      <Focusable id="setting-display">
        <Box surface rounded="lg" p={4}>
          <Stack direction="horizontal" align="center" justify="between">
            <Text weight="semibold">Display Brightness</Text>
            <Text dim>Auto</Text>
          </Stack>
        </Box>
      </Focusable>

      <Focusable id="setting-notify">
        <Box surface rounded="lg" p={4}>
          <Stack direction="horizontal" align="center" justify="between">
            <Text weight="semibold">Notifications</Text>
            <Text dim>On</Text>
          </Stack>
        </Box>
      </Focusable>

      <Focusable id="setting-band">
        <Box surface rounded="lg" p={4}>
          <Stack direction="horizontal" align="center" justify="between">
            <Text weight="semibold">Neural Band</Text>
            <Text dim>Connected</Text>
          </Stack>
        </Box>
      </Focusable>

      <Box className="mt-4" p={2}>
        <Text size="xs" dim>
          mrbd-ui-kit v0.1.0
        </Text>
      </Box>
    </Stack>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  return (
    <DisplayRoot
      focusOptions={{ wrap: true, initialFocusId: "accept-btn" }}
      onSelect={(id) => console.log("selected:", id)}
    >
      {activeTab === "home" && <HomeTab />}
      {activeTab === "search" && <SearchTab />}
      {activeTab === "settings" && <SettingsTab />}

      <NavigationBar
        items={[
          { id: "home", label: "Home", icon: "home" },
          { id: "search", label: "Search", icon: "search" },
          { id: "settings", label: "Settings", icon: "settings" },
        ]}
        activeId={activeTab}
        onSelect={(id) => setActiveTab(id as Tab)}
      />
    </DisplayRoot>
  );
}
