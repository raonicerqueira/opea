export const modalVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

export const modalTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};
