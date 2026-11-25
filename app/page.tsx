import type { Metadata } from 'next';
import {
  Closing, FeaturedTutors, FindUs, Hero, Highlight, ResultsBand, Steps, Week, YearLevels,
} from '../components/home';
import { business } from '../content/business';
import { pageMetadata } from '../lib/page-metadata';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = pageMetadata('/', `${business.name}: tutoring from Prep to VCE in Melbourne`, business.introduction);

export default function HomePage() {
  return <>
    <Hero>
      <Hero.Note>p. 1, today’s lesson</Hero.Note>
      <Hero.Heading>Lightbulb <Highlight>moments</Highlight>, every week.</Hero.Heading>
      <Hero.Introduction>
        Small-group and one-to-one tutoring from Prep to VCE, right opposite the State Library. Patient
        tutors, clear progress, and a learner who walks out a little taller.
      </Hero.Introduction>
      <Hero.Actions>
        <Hero.Primary>Ask about a free learning check</Hero.Primary>
        <Hero.Secondary href="/timetable/">See the term timetable</Hero.Secondary>
      </Hero.Actions>
      <Hero.Facts>
        <Hero.Fact>Prep to VCE, reading to chemistry</Hero.Fact>
        <Hero.Fact>Small groups of four to six</Hero.Fact>
        <Hero.Fact>A free 30-minute learning check</Hero.Fact>
      </Hero.Facts>
    </Hero>

    <YearLevels>
      <YearLevels.Heading>Find your year level</YearLevels.Heading>
      <YearLevels.Introduction>
        Five groups, from first readers to final exams. Pick one to see what we teach, how long sessions run and what they cost.
      </YearLevels.Introduction>
    </YearLevels>

    <Steps>
      <Steps.Heading>How it starts</Steps.Heading>
      <Steps.List>
        <Steps.Step number={1} title="A free learning check" aside="Free, 30 minutes, and no obligation to enrol.">
          A relaxed chat and a few short activities with one of our tutors, so we can see what’s clicking and what isn’t.
          Parents stay for the chat; learners usually enjoy the puzzles.
        </Steps.Step>
        <Steps.Step number={2} title="A plan for the term">
          We suggest a class or one-to-one time, explain what we’ll focus on and why, and agree on what progress should look like by the end of term.
        </Steps.Step>
        <Steps.Step number={3} title="Weekly sessions, and a note home">
          Every session ends with a short progress note: what we covered, what went well, and one thing to practise before next week.
        </Steps.Step>
      </Steps.List>
    </Steps>

    <Week>
      <Week.Heading>This week at the centre</Week.Heading>
      <Week.Introduction>
        A page from our planner. Each lit bulb is an open place in that class at the time of publishing; we confirm places when we reply to your enquiry.
      </Week.Introduction>
      <Week.Link href="/timetable/">See the full term timetable</Week.Link>
    </Week>

    <FeaturedTutors link={<FeaturedTutors.Link href="/tutors/">Meet all six tutors</FeaturedTutors.Link>}>
      <FeaturedTutors.Heading>Meet a few of the tutors</FeaturedTutors.Heading>
    </FeaturedTutors>

    <ResultsBand>
      <ResultsBand.Heading>Results we’re proud of</ResultsBand.Heading>
      <ResultsBand.Link href="/results/">Read the progress stories</ResultsBand.Link>
    </ResultsBand>

    <FindUs hoursTitle="Centre hours">
      <FindUs.Heading>Find us on Swanston Street</FindUs.Heading>
      <FindUs.Address />
      <FindUs.Directions>Get directions</FindUs.Directions>
    </FindUs>

    <Closing>
      <Closing.Heading>Not sure where to start?</Closing.Heading>
      <Closing.Text>That’s what the learning check is for. Tell us a little about your learner and we’ll reply to arrange a time.</Closing.Text>
      <Closing.Action>Ask about a free learning check</Closing.Action>
    </Closing>

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }} />
  </>;
}
