import { LostPaperPlane } from '../components/art/paper-plane';
import { NotFoundPage } from '../components/not-found';

export default function NotFound() {
  return <NotFoundPage art={<LostPaperPlane className="h-auto w-full max-w-3xl" />}>
    <NotFoundPage.Note>p. 404, missing</NotFoundPage.Note>
    <NotFoundPage.Heading>This page wandered off to the library.</NotFoundPage.Heading>
    <NotFoundPage.Text>It may have moved, or the link had a typo. Try one of these instead:</NotFoundPage.Text>
    <NotFoundPage.Links>
      <NotFoundPage.Link href="/">Back to the home page</NotFoundPage.Link>
      <NotFoundPage.Link href="/timetable/">See the term timetable</NotFoundPage.Link>
      <NotFoundPage.Link href="/contact/">Ask us a question</NotFoundPage.Link>
    </NotFoundPage.Links>
  </NotFoundPage>;
}
