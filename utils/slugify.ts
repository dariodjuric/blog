import slugify from 'slugify';

export function slugifyLowercase(str: string) {
  return slugify(str).toLowerCase();
}
