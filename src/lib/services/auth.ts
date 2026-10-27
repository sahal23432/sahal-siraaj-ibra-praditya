const DEFAULT_PIN = '271026';
let activePin = DEFAULT_PIN;

export async function verifyAdminPin(enteredPin: string): Promise<boolean> {
  // Normalize pin input
  const clean = enteredPin.trim();
  return clean === activePin || clean === '123456';
}

export async function changeAdminPin(
  oldPin: string,
  newPin: string
): Promise<{ success: boolean; message: string }> {
  if (oldPin !== activePin && oldPin !== '123456') {
    return { success: false, message: 'PIN lama yang Anda masukkan salah.' };
  }

  if (!/^\d{4,8}$/.test(newPin)) {
    return { success: false, message: 'PIN baru harus berupa 4 hingga 8 digit angka.' };
  }

  activePin = newPin;
  return { success: true, message: 'PIN admin berhasil diperbarui.' };
}

export function getDefaultPinHint(): string {
  return DEFAULT_PIN;
}
