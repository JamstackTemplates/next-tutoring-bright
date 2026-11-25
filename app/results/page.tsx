import type { Metadata } from 'next';
import { ResultsChart } from '../../components/art/results-chart';
import { Closing } from '../../components/home';
import { PageHead } from '../../components/page-head';
import { Measure, QuoteNotes, StatCircles, Stories } from '../../components/results';
import { pageMetadata } from '../../lib/page-metadata';

export const metadata: Metadata = pageMetadata('/results/', 'Results',
  'Progress stories, family quotes and survey figures from Lightbulb Tutoring, with how we measure progress. We never promise marks.');

export default function ResultsPage() {
  return <>
    <PageHead art={<ResultsChart className="h-auto w-80 rotate-2" />}>
      <PageHead.Note>p. 5, results</PageHead.Note>
      <PageHead.Title>Progress you can <PageHead.Highlight>see</PageHead.Highlight></PageHead.Title>
      <PageHead.Lede>
        <p>Not every win shows up in a report card. Here’s what changes for our learners, in their own words and in our own records.</p>
      </PageHead.Lede>
    </PageHead>

    <StatCircles heading="Our figures" />

    <Stories>
      <Stories.Heading>Before and after</Stories.Heading>
      <Stories.Introduction>Four learners, one term or more each. First names only, shared with their families’ permission.</Stories.Introduction>
    </Stories>

    <QuoteNotes heading="What families tell us" />

    <Measure>
      <Measure.List heading="What we measure">
        <Measure.Item note="every term" title="Reading levels">Early readers are levelled at the learning check and again at the end of each term, using the same benchmark texts.</Measure.Item>
        <Measure.Item note="weeks 5 and 10" title="Check-in tasks">A short task on the term’s goal, marked against the same rubric each time, so growth is easy to see.</Measure.Item>
        <Measure.Item note="end of term" title="Confidence survey">Learners tell us, in a few quick questions, how they feel about the subject and about asking for help.</Measure.Item>
      </Measure.List>
      <Measure.Disclaimer heading="A note from the teacher" />
    </Measure>

    <Closing>
      <Closing.Heading>Every story starts with a chat</Closing.Heading>
      <Closing.Text>Tell us where your learner is now. We’ll suggest where to start in our reply.</Closing.Text>
      <Closing.Action>Ask about a free learning check</Closing.Action>
    </Closing>
  </>;
}
