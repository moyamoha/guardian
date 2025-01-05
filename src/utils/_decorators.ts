export function successChecker(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    try {
      await originalMethod.apply(this, args); // Call the original method
      return true; // Return true if the method runs successfully
    } catch (error) {
      return false; // Return false if an error occurred
    }
  };

  return descriptor;
}
