const PREFIX = "[insights-cms]";

export function cmsWarn(message: string, extra?: unknown) {
  if (extra === undefined) {
    console.warn(PREFIX, message);
    return;
  }
  console.warn(PREFIX, message, extra);
}

export function cmsError(message: string, extra?: unknown) {
  if (extra === undefined) {
    console.error(PREFIX, message);
    return;
  }
  console.error(PREFIX, message, extra);
}
