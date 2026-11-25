import type { Metadata } from 'next';
import { SubjectIcon } from '../../components/art/subject-icon';
import { Closing } from '../../components/home';
import { PageHead } from '../../components/page-head';
import { AllBands, BandTabs, Compare, Includes } from '../../components/subjects';
import { pageMetadata } from '../../lib/page-metadata';

export const metadata: Metadata = pageMetadata('/subjects/', 'Subjects and year levels',
  'Reading, writing, maths, English, science, selective entry and VCE subjects from Prep to Year 12, with session lengths and prices.');

export default function SubjectsPage() {
  return <>
    <PageHead art={<span className="grid grid-cols-2 gap-3 rotate-3"><SubjectIcon icon="abc" className="h-20 w-20" /><SubjectIcon icon="beaker" className="h-20 w-20" /><SubjectIcon icon="curve" className="h-20 w-20" /><SubjectIcon icon="nib" className="h-20 w-20" /></span>}>
      <PageHead.Note>p. 2, subjects</PageHead.Note>
      <PageHead.Title>What we teach, <PageHead.Highlight>year by year</PageHead.Highlight></PageHead.Title>
      <PageHead.Lede>
        <p>Ten subjects across five year groups, each taught in small groups or one-to-one. Prices are per session and include GST.</p>
      </PageHead.Lede>
    </PageHead>

    <BandTabs label="Year levels" />
    <AllBands timetableLabel="See class times" />

    <Compare>
      <Compare.Heading>Group or one-to-one?</Compare.Heading>
      <Compare.Introduction>Most learners start in a small group. One-to-one suits catching up on something specific, or a timetable that won’t fit our classes.</Compare.Introduction>
      <Compare.Table rows={[
        { label: 'Group size', group: 'Four to six learners in the same year group', oneToOne: 'Just your learner and their tutor' },
        { label: 'Times', group: 'Fixed weekly class on the term timetable', oneToOne: 'Arranged with you, during centre hours' },
        { label: 'Best for', group: 'Steady progress, and learning from classmates’ questions', oneToOne: 'Specific gaps, exam preparation, or extra confidence' },
        { label: 'Progress', group: 'A note home after every session', oneToOne: 'A note home after every session, plus a termly check-in' },
      ]} />
    </Compare>

    <Includes>
      <Includes.Heading>What every session includes</Includes.Heading>
      <Includes.List>
        <Includes.Item>A warm-up question to get thinking</Includes.Item>
        <Includes.Item>Focused practice on this week’s goal</Includes.Item>
        <Includes.Item>A short progress note home</Includes.Item>
      </Includes.List>
    </Includes>

    <Closing>
      <Closing.Heading>Not sure which class fits?</Closing.Heading>
      <Closing.Text>Tell us the year level and what’s tricky, and we’ll suggest a class or a one-to-one time in our reply.</Closing.Text>
      <Closing.Action>Ask about a free learning check</Closing.Action>
    </Closing>
  </>;
}
