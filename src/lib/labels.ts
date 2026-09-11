export const ActionLabels = {
  Read: "Read",
  ViewChapters: "View Chapters",
  ReadContent: "Read Content",
};

export function actionLabelForType(typeLabel?: string) {
  return typeLabel === "Course" ? ActionLabels.ViewChapters : ActionLabels.Read;
}

export default ActionLabels;
