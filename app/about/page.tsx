import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About RESSCO Metals",
  description:
    "Founded in 1996, RESSCO Metals is a family-owned company delivering high-quality HVAC and sheet metal products with dependable service.",
  path: "/about",
});

const ASSETS = {
  hero: "/hero/about-hero.webp",
  missionHero: "/about/mission-hero.webp",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The Full Story"
        title="About Us"
        subtitle="Founded in 1996, RESSCO Metals, Inc. is a family-owned company built on quality, service, and long-term partnerships."
        media={{ src: ASSETS.hero, alt: "RESSCO Metals shop", priority: true }}
        overlay="dark"
      />

      <Section className="py-12 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <div className="text-xl font-extrabold">Our story</div>
            <div className="mt-4 space-y-4 text-black/70">
              <p>
                Founded in 1996, RESSCO Metals, Inc. is a family-owned company
                that began with just a few tools and aging machines in the
                corner of a small warehouse. What started as a mission to
                provide convenience to small contractors quickly evolved into a
                passion for delivering high-quality HVAC products. That
                commitment to quality and service has driven our growth and
                shaped who we are today.
              </p>
              <p>
                With more than 25 years of experience in the HVAC and sheet
                metal industry, our team is dedicated to earning your repeat
                business by delivering every project with the highest quality
                and best service. We take pride in meeting deadlines, paying
                close attention to detail, and ensuring each design meets the
                specific needs of our clients.
              </p>
              <p>
                We value every customer and strive to exceed expectations on
                every project. Our deep understanding of HVAC design allows us
                to maximize efficiency, performance, and overall customer
                satisfaction.
              </p>
              <p className="font-semibold text-black/80">
                When you walk through our doors, we are ready to serve—every
                time.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-xl font-extrabold">Mission</div>
            <p className="mt-3 text-black/70">
              To provide superior sheet metal products and supply chain
              solutions that consistently meet or exceed our customers’ needs
              and expectations. We strive to consistently deliver the highest
              quality products, exemplary service and exceptional value.
            </p>

            <div className="mt-6 text-xl font-extrabold">Vision</div>
            <p className="mt-3 text-black/70">
              By remaining committed to new technical solutions, delivering
              high-quality products and parts and complete customer service, we
              will be recognized as the partner of choice in the industries we
              serve.
            </p>
          </Card>
        </div>
      </Section>

      <Section className="bg-brand-gray py-12 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <div className="text-xl font-extrabold">Values</div>
            <div className="mt-4 space-y-4 text-black/70">
              <div>
                <div className="font-bold text-black/80">We are achievers.</div>
                <div>
                  If you can draw it on paper, we can make it in metal — on time
                  and on budget.
                </div>
              </div>

              <div>
                <div className="font-bold text-black/80">
                  Our customers are our partners.
                </div>
                <div>
                  We are service-oriented and focused on our customers&apos;
                  needs — we work rigorously to ensure our partnerships are
                  successful and continually growing.
                </div>
              </div>

              <div>
                <div className="font-bold text-black/80">We are a team.</div>
                <div>
                  We are committed to the future of this company and its
                  strategic growth through the employees that help make us
                  successful every day. We promote a healthy work-life balance
                  and strive to promote a positive corporate culture.
                </div>
              </div>

              <div>
                <div className="font-bold text-black/80">
                  We do what we say we will do.
                </div>
                <div>
                  We “walk the walk.” We are passionate about integrity and
                  honesty: a combination that works for us and you!
                </div>
              </div>

              <div>
                <div className="font-bold text-black/80">
                  We’ve got an attitude!
                </div>
                <div>
                  We foster a culture of Can Do, where no member of our team
                  will give up until we&apos;ve “got it.” Every challenge we
                  encounter, we manage in the same thoughtful and thorough
                  manner, no matter how small or large the job it may be.
                </div>
              </div>
            </div>
          </Card>

          <Card className="relative overflow-hidden p-0 min-h-[420px] border border-black/10">
            {/* Uses placeholder created in FASE B */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${ASSETS.missionHero})` }}
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative p-7">
              <div className="text-sm font-extrabold tracking-wide text-white/80">
                Motivational Quote
              </div>
              <div className="mt-3 text-2xl font-extrabold text-white">
                [[PENDING: quote text]]
              </div>
              <div className="mt-4 text-white/85">
                (Sección requerida en DOCX: “MOTIVATIONAL QUOTE…”.)
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section className="py-12 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <div className="text-xl font-extrabold">Materials</div>

            <div className="mt-4 space-y-6 text-black/70">
              <div>
                <div className="font-bold text-black/80">Galvanized</div>
                <p className="mt-2">
                  Galvanized steel we work in thickness of 26,24,22,20,18 &amp;
                  16 Gauge. These are all pre-galvanized, meaning that we can
                  perform the cutting of the material without needing any
                  surface treatment afterward. This helps to keep the total
                  costs lower.
                </p>
                <p className="mt-2">
                  Galvanization provides good protection against the environment
                  because of the thickness of the layer. Also, when damaged, it
                  is zinc that is going to corrode instead of the base metal.
                  Zinc oxide forms a new layer to cover the damaged patch.
                </p>
              </div>

              <div>
                <div className="font-bold text-black/80">Stainless Steel</div>
                <p className="mt-2">
                  So, if you are looking for an answer for more difficult
                  conditions, here it is – stainless steel. It lasts longer and
                  does not require a protective coating. Although, it can be
                  implemented for an even longer lifetime.
                </p>
                <p className="mt-2">
                  Stainless steel is an excellent choice for high-temperature or
                  marine environments, as both heat and salts speed up the
                  process of corrosion. Also, when there is a danger for
                  material wear that can result in damaged paint, stainless
                  steel proves a good solution.
                </p>
              </div>

              <div>
                <div className="font-bold text-black/80">Aluminum</div>
                <p className="mt-2">
                  Aluminum cutting needs special care. It has a lower melting
                  temperature and may leave a burr even with laser cutting.
                  Also, its reflective nature means that fiber lasers are better
                  for cutting it.
                </p>
                <p className="mt-2">
                  The material itself has some stand-out qualities like
                  corrosion resistance, good electric conductivity and
                  lightweight. The properties depend on the exact material
                  grade, as some are easily malleable, while others provide
                  better strength and hardness.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-xl font-extrabold">
              Other materials &amp; services
            </div>
            <ul className="mt-4 space-y-2 text-black/80">
              {[
                "BLACK IRON",
                "COPPER",
                "HEAVY STEEL ( UP TO 1” THICK)",
                "WELDING (TIG, MIG WIRE WELDING)",
                "LASER CUTTING AND DESIGN",
              ].map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="mt-1 text-brand-red">✓</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 text-xl font-extrabold">
              What makes us different
            </div>
            <div className="mt-4 space-y-4 text-black/70">
              <div>
                <div className="font-bold text-black/80">
                  We’re Honest — Always
                </div>
                <div>
                  At Ressco, we believe honesty builds long-term relationships.
                  We don’t overpromise, we don’t cut corners, and we don’t hide
                  behind fine print. If something changes, you’ll hear it from
                  us first—straight and transparent.
                </div>
              </div>

              <div>
                <div className="font-bold text-black/80">
                  We Respect Your Time
                </div>
                <div>
                  Lead times matter. Your project, schedule, and reputation
                  depend on it. That’s why we communicate realistic timelines
                  and work hard to meet them. No guessing, no surprises—just
                  clear expectations and dependable delivery.
                </div>
              </div>

              <div>
                <div className="font-bold text-black/80">
                  Customer Service That Actually Serves
                </div>
                <div>
                  When you call Ressco, you talk to real people who care about
                  getting it right. We’re responsive, knowledgeable, and here to
                  help before, during, and after your order. Your success is our
                  priority.
                </div>
              </div>

              <div>
                <div className="font-bold text-black/80">
                  Built on Trust, Backed by Results
                </div>
                <div>
                  We don’t aim for one-time sales—we aim for long-term
                  partnerships. Our customers come back because they know they
                  can count on us to do what we say, every time.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section className="bg-brand-gray py-12 sm:py-14">
        <Card className="p-7">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            Letter from Edwin
          </div>
          <div className="mt-2 text-2xl font-extrabold">Hello and welcome,</div>

          <div className="mt-4 space-y-4 text-black/70">
            <p>
              My name is Edwin Tobar, President of RESSCO Metals, Inc. I am
              someone who values clarity, results, and long-term relationships.
              I believe in solving real problems with practical solutions and
              bringing a strong sense of purpose to every project we take on.
            </p>
            <p>
              I have been in the HVAC and metals industry for over 40 years, and
              I come from the old school of customer service. Because of that, I
              personally guarantee that every employee at RESSCO Metals is
              trained to treat people with respect, professionalism, and
              integrity.
            </p>
            <p>
              One question I’m often asked is how the name RESSCO came to be. In
              1985, I began my career with a company called Reliable Steel
              Supply Co. During my time there, I was treated with respect and
              taught not only the technical side of the business, but also the
              values of hard work, honesty, and how to work with people the
              right way.
            </p>
            <p>
              In honor and memory of those experiences—and the wonderful people
              who helped shape my career—I chose the initials of that company
              when naming RESSCO. It represents the foundation on which this
              company was built and the standards we continue to uphold today.
            </p>
            <p>
              Thank you for visiting our site. We look forward to earning your
              trust and your business.
            </p>
            <p className="font-semibold text-black/80">
              Edwin Tobar — President, RESSCO Metals, Inc.
            </p>
          </div>
        </Card>
      </Section>
    </>
  );
}
