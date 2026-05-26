export function verifyAdminSecret(request: Request): boolean {
  const secret = process.env.ADMIN_API_SECRET;

  if (!secret) {
    return true;
  }

  const headerSecret = request.headers.get('x-admin-secret');
  return headerSecret === secret;
}

export function adminSecretRequired(): boolean {
  return Boolean(process.env.ADMIN_API_SECRET);
}
