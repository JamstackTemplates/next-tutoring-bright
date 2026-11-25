import type { Metadata } from 'next';
import { TutorPortrait } from '../../components/art/tutor-portrait';
import { Closing } from '../../components/home';
import { PageHead } from '../../components/page-head';
import { Choosing, StaffroomWall } from '../../components/tutors';
import { tutors } from '../../content/tutors';
import { pageMetadata } from '../../lib/page-metadata';

export const metadata: Metadata = pageMetadata('/tutors/', 'Tutors',
  'Meet the six tutors at Lightbulb Tutoring: qualified teachers and subject specialists, each with a current Working with Children Check.');

export default function TutorsPage() {
  return <>
    <PageHead art={<span className="flex -space-x-6">{tutors.slice(0, 3).map(tutor => <TutorPortrait key={tutor.id} portrait={tutor.portrait} className="h-24 w-24" />)}</span>}>
      <PageHead.Note>p. 4, tutors</PageHead.Note>
      <PageHead.Title>The people who <PageHead.Highlight>explain it again</PageHead.Highlight></PageHead.Title>
      <PageHead.Lede>
        <p>Six tutors, each a qualified teacher or subject specialist, and each happy to find another way to explain something until it clicks.</p>
      </PageHead.Lede>
    </PageHead>

    <StaffroomWall heading="All tutors" />

    <Choosing>
      <Choosing.Intro heading="How we choose tutors">
        <p>Every tutor holds a current Working with Children Check. Beyond that, we look for people who are patient, precise and genuinely curious about how each learner thinks.</p>
      </Choosing.Intro>
      <Choosing.List>
        <Choosing.Item title="A Working with Children Check">Current and verified before anyone joins, and checked again every year.</Choosing.Item>
        <Choosing.Item title="A degree in their subject">Plus teaching qualifications or years of specialist tutoring.</Choosing.Item>
        <Choosing.Item title="A trial lesson, observed">Maya watches every new tutor teach a real group before they take a class of their own.</Choosing.Item>
        <Choosing.Item title="Training every term">Shared planning, new resources and a close look at what helped learners most.</Choosing.Item>
      </Choosing.List>
    </Choosing>

    <Closing>
      <Closing.Heading>Want a particular tutor?</Closing.Heading>
      <Closing.Text>Mention them in your message. We’ll tell you which of their classes or one-to-one times might suit.</Closing.Text>
      <Closing.Action>Ask about a class</Closing.Action>
    </Closing>
  </>;
}
