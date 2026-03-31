import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Circle,
  CheckCircle,
  AlertCircle,
  Timer,
  HelpCircle,
  CircleOff,
} from 'lucide-react'

export const labels = [
  {
    value: 'bug',
    labelKey: 'options.labels.bug',
  },
  {
    value: 'feature',
    labelKey: 'options.labels.feature',
  },
  {
    value: 'documentation',
    labelKey: 'options.labels.documentation',
  },
]

export const statuses = [
  {
    labelKey: 'options.statuses.backlog',
    value: 'backlog' as const,
    icon: HelpCircle,
  },
  {
    labelKey: 'options.statuses.todo',
    value: 'todo' as const,
    icon: Circle,
  },
  {
    labelKey: 'options.statuses.inProgress',
    value: 'in progress' as const,
    icon: Timer,
  },
  {
    labelKey: 'options.statuses.done',
    value: 'done' as const,
    icon: CheckCircle,
  },
  {
    labelKey: 'options.statuses.canceled',
    value: 'canceled' as const,
    icon: CircleOff,
  },
]

export const priorities = [
  {
    labelKey: 'options.priorities.low',
    value: 'low' as const,
    icon: ArrowDown,
  },
  {
    labelKey: 'options.priorities.medium',
    value: 'medium' as const,
    icon: ArrowRight,
  },
  {
    labelKey: 'options.priorities.high',
    value: 'high' as const,
    icon: ArrowUp,
  },
  {
    labelKey: 'options.priorities.critical',
    value: 'critical' as const,
    icon: AlertCircle,
  },
]
