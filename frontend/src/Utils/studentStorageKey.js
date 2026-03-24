export const getStudentStorageKey = (user) => {
    if (!user) return null;
    return user.username || user.email || null;
};
