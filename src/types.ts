export type EventFrame = {
  filename: string;
  abs_path?: string;
  function?: string;
  module?: string;
  lineno?: number;
  colno?: number;
  pre_context?: string[];
  post_context?: string[];
  context_line?: string;
  vars?: {
    [key: string]: string;
  };
  in_app?: boolean;
};

export type EventStacktrace = {
  frames: EventFrame[];
};

export type EventExceptionValue = {
  type: string;
  value: string;
  stacktrace?: EventStacktrace;
};

export type EventException =
  | {
      values: EventExceptionValue[];
    }
  | {
      value: EventExceptionValue;
    };

export type Breadcrumbs = {
  values: {
    message: string;
    category: string;
    timestamp: string;
    type: string | "default";
  }[];
};

type CommonEventAttrs = {
  // not always present, but we are forcing it in EventCache
  event_id: string;
  timestamp: string;
  breadcrumbs?: Breadcrumbs;
  transaction?: string;
  environment?: string;
  platform?: string;
  server_name?: string;
  release?: string;
  type?: "transaction" | string;
  start_timestamp?: string;
  contexts?: Contexts;
  tags?: Tags;
};

export type Contexts = {
  [key: string]: Context;
};

export type Context = {
  [key: string]: string | number;
};

export type TraceContext = {
  trace_id: string;
  span_id: string;
  parent_span_id?: string | null;
  op: string;
  description?: string | null;
  status: "ok" | string;
};

export type Tags = {
  [key: string]: string;
};

export type SentryErrorEvent = CommonEventAttrs & {
  exception: EventException;
};

export type Span = {
  trace_id: string;
  span_id: string;
  parent_span_id: string;
  op: string;
  description?: string | null;
  start_timestamp: string;
  tags: Tags;
  timestamp: string;
  status: "ok" | string;
};

export type SentryTransactionEvent = CommonEventAttrs & {
  type: "transaction";
  spans: Span[];
  start_timestamp: string;
  contexts: Contexts & {
    trace: TraceContext;
  };
};

export type SentryEvent = SentryErrorEvent | SentryTransactionEvent;
