"use client"

import { useMemo, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Cpu,
  HardDrive,
  Wifi,
  Activity,
  RefreshCw,
  Zap,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type DeviceStatus = "online" | "offline" | "warning"

type DeviceAction = "restart" | "sync" | "power" | "check-status"

interface Device {
  id: string
  name: string
  type: string
  status: DeviceStatus
  ip: string
  lastSeen: string
  icon: LucideIcon
}

const initialDevices: Device[] = [
  {
    id: "device-1",
    name: "Edge Router 01",
    type: "Network Gateway",
    status: "online",
    ip: "10.0.1.5",
    lastSeen: "2 minutes ago",
    icon: Wifi,
  },
  {
    id: "device-2",
    name: "App Server 02",
    type: "Application Host",
    status: "warning",
    ip: "10.0.2.8",
    lastSeen: "5 minutes ago",
    icon: Cpu,
  },
  {
    id: "device-3",
    name: "Storage Node 03",
    type: "Block Storage",
    status: "offline",
    ip: "10.0.3.19",
    lastSeen: "12 minutes ago",
    icon: HardDrive,
  },
]

const actionLabels: Record<DeviceAction, string> = {
  restart: "Restart",
  sync: "Sync Config",
  power: "Power Cycle",
  "check-status": "Refresh Status",
}

const statusStyles: Record<DeviceStatus, string> = {
  online: "bg-emerald-500/10 text-emerald-500",
  offline: "bg-destructive/10 text-destructive",
  warning: "bg-amber-500/10 text-amber-500",
}

export function DeviceControl() {
  const [devices, setDevices] = useState<Device[]>(initialDevices)
  const [logs, setLogs] = useState<string[]>([])
  const [activeDevice, setActiveDevice] = useState<string | null>("device-1")

  const selectedDevice = useMemo(
    () => devices.find((device) => device.id === activeDevice) ?? devices[0],
    [activeDevice, devices],
  )

  const performAction = (deviceId: string, action: DeviceAction) => {
    const device = devices.find((item) => item.id === deviceId)
    if (!device) return

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
    const message = `${timestamp} — ${device.name}: ${actionLabels[action]} requested`
    setLogs((current) => [message, ...current].slice(0, 12))

    setDevices((current) =>
      current.map((item) => {
        if (item.id !== deviceId) return item

        if (action === "power") {
          return {
            ...item,
            status: item.status === "offline" ? "online" : "offline",
            lastSeen: item.status === "offline" ? "just now" : "30 seconds ago",
          }
        }

        if (action === "restart") {
          return {
            ...item,
            status: "online",
            lastSeen: "just now",
          }
        }

        if (action === "sync") {
          return {
            ...item,
            lastSeen: "1 minute ago",
          }
        }

        if (action === "check-status") {
          return {
            ...item,
            status: item.status === "offline" ? "offline" : "online",
            lastSeen: "just now",
          }
        }

        return item
      }),
    )
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium uppercase tracking-[0.3em] text-accent">Control Portal</div>
            <h1 className="text-3xl font-bold text-foreground">Infrastructure control made safe and simple</h1>
            <p className="max-w-2xl text-muted-foreground">
              Manage devices, execute operational actions, and keep an audit trail for every control event. Start with lifecycle commands and expand to automation workflows later.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Primary control actions</CardTitle>
                <CardDescription>Trigger safe lifecycle operations with a single click.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {(["restart", "sync", "power", "check-status"] as DeviceAction[]).map((action) => (
                    <Button
                      key={action}
                      variant={action === "power" ? "destructive" : "secondary"}
                      onClick={() => selectedDevice && performAction(selectedDevice.id, action)}
                    >
                      {actionLabels[action]}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operational status</CardTitle>
                <CardDescription>Latest state for the selected device.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-3xl border border-border bg-background p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Device</div>
                        <div className="text-lg font-semibold text-foreground">{selectedDevice.name}</div>
                      </div>
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[selectedDevice.status]}`}>
                        {selectedDevice.status}
                      </span>
                    </div>
                    <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
                      <div>Type: {selectedDevice.type}</div>
                      <div>IP: {selectedDevice.ip}</div>
                      <div>Last seen: {selectedDevice.lastSeen}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" onClick={() => setActiveDevice(devices[0].id)}>
                      Select Edge Router
                    </Button>
                    <Button variant="outline" onClick={() => setActiveDevice(devices[1].id)}>
                      Select App Server
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Device inventory</CardTitle>
              <CardDescription>Pick a device from your managed infrastructure to inspect and control.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {devices.map((device) => {
                  const Icon = device.icon
                  return (
                    <button
                      key={device.id}
                      type="button"
                      onClick={() => setActiveDevice(device.id)}
                      className={`group flex items-center justify-between gap-4 rounded-3xl border p-4 text-left transition-all ${
                        device.id === selectedDevice.id
                          ? "border-accent bg-accent/10"
                          : "border-border bg-card hover:border-accent/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{device.name}</div>
                          <div className="text-sm text-muted-foreground">{device.type}</div>
                        </div>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[device.status]}`}>
                        {device.status}
                      </span>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Action log</CardTitle>
              <CardDescription>Audit trail of user operations and control requests.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {logs.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No operations executed yet.</p>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="rounded-2xl bg-secondary/50 px-4 py-3 text-sm text-foreground">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => setLogs([])}>
                Clear Log
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Safety guardrails</CardTitle>
              <CardDescription>Built-in controls to reduce risk in early stages.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <ShieldCheck className="mt-1 h-4 w-4 text-emerald-500" />
                  Review control commands before execution with manual approval.
                </p>
                <p className="flex items-start gap-2">
                  <AlertTriangle className="mt-1 h-4 w-4 text-amber-500" />
                  Only allow trusted operators to access the control portal through RBAC.
                </p>
                <p className="flex items-start gap-2">
                  <Activity className="mt-1 h-4 w-4 text-sky-500" />
                  Track every action with timestamps and device context.
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  )
}
