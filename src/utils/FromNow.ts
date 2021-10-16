import { formatDistanceToNowStrict, parseISO } from 'date-fns';

export default function fromNow(value: string): string {
  return formatDistanceToNowStrict(parseISO(value), { addSuffix: true });
}
