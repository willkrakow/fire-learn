export function createdInLastWeek(user: UserDocument) {
  return (
    user.data.created_at.toDate() >
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
  );
}

export function createdInLastDay(user: UserDocument) {
  return (
    user.data.created_at.toDate() > new Date(Date.now() - 1000 * 60 * 60 * 24)
  );
}
