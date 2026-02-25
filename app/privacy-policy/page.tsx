import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | RESSCO Metals",
  description: "Privacy Policy for RESSCO Metals text messaging service.",
  path: "/privacy-policy",
});

const OCR_TEXT = `
Privacy Policy

Overview
The Ressco Metals privacy statement recognizes the value of privacy of its customers.

This privacy notice provides more specific information on how the Ressco Metals text messaging service collects and processes your personal information.

Scope
The notice applies to our practices for gathering and disseminating information related to the Ressco Metals text messaging service (“we”, “us”, or “our”) and is meant to provide you an overview of our practices when collecting and processing personal information.

How We Collect Information
We collect personal information in the following circumstances:

Direct Collection, when you provide information by responding to text messages.

Automated Processes, when the Zoom platform gathers information as you interact with the service.


What Type of Information We Collect
Direct Collection
We directly collect the following personal information:

Opt-out preferences

Content of your text message responses to us.


Collection from Ressco Metals Sources
We import personal information from Ressco Metals systems and sources. The information includes:

First and last name

Phone number.


Automated Collection
We automatically collect the following personal information:

Device status indicating whether a device is available for messaging

Carrier (e.g. Verizon, AT&T, etc.)

Country associated with the phone (we are not sending international text messages)

Delivery status

Error codes indicating why a message was not delivered (e.g. number associated with a landline, unreachable device, etc.)


How This Information Is Used
We use the personal  information we collect to communicate with you regarding Ressco Metals sales and services, such as:

Updates, to keep you informed of updates to your requests.


With Whom This Information Is Shared
We do not sell or rent your personal information. We may, however, share your personal information in limited circumstances, such as with external service providers that support business activities. Specifically, we share your information with Zoom, which provides the communications platform Ressco Metals uses for text messaging services.

We require our service providers to keep your personal information secure, and do not allow them to use or share your personal information for any purpose other than providing services on our behalf.  

We may also share your personal information when required by law.


What Choices You Can Make About Your Information
If you wish to unsubscribe from text messages for a campaign, you can reply with words, such as ‘cancel’, ‘end’, ‘quit’, ‘unsubscribe’, ‘stop’, or ‘stop all’ and you will no longer receive messages.

If you wish to re-subscribe, reply with words, such as ‘start’, ‘yes’, or ‘unstop’.

Please note that unsubscribing from text messages from one campaign will not unsubscribe you from other campaigns. Unsubscribing will not remove your information from source Ressco Metals systems. 


How Information Is Secured
Ressco Metals recognizes the importance of maintaining the security of the information it collects and maintains, and we endeavor to protect information from unauthorized access and damage. Ressco Metals strives to ensure reasonable security measures are in place, including physical, administrative, and technical safeguards to protect your personal information.


Privacy Notice Changes
This privacy notice may be updated from time to time. We will post the date our notice was last updated at the top of this privacy notice.

​

Who to Contact With Questions or Concerns
If you have any concerns or questions about how your personal data is used, please contact Ressco Metals at privacy@resscometals.com or 1254 N Knollwood Cir, Anaheim, CA 92801
`.trim();

/**
 * NOTE:
 * OCR from screenshot is imperfect; we intentionally preserve it
 * without "fixing" meaning. If you want, we can replace this block
 * with the exact exported Wix text when available.
 */

export default function PrivacyPolicyPage() {
  const paragraphs = OCR_TEXT.split("\n")
    .map((x) => x.trim())
    .filter(Boolean);

  return (
    <Section className="pt-10 sm:pt-14 pb-14">
      <div className="max-w-3xl">
        <div className="text-sm font-extrabold tracking-wide text-black/60">
          POLICY
        </div>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>

        <Card className="mt-7 p-6">
          <div className="space-y-4 text-black/70">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Card>

        <div className="mt-6 text-sm text-black/60">
          [[PENDING: if you provide the exact Wix text export, we replace OCR
          1:1.]]
        </div>
      </div>
    </Section>
  );
}
