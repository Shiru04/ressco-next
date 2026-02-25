import Script from "next/script";

function isEnabled(v: string | undefined) {
  if (!v) return false;
  const s = v.trim();
  return s !== "" && s !== "0" && s.toLowerCase() !== "false";
}

export function Tracking() {
  const ga4 = process.env.NEXT_PUBLIC_GA4_ID;
  const hjId = process.env.NEXT_PUBLIC_HOTJAR_ID;
  const hjVer = process.env.NEXT_PUBLIC_HOTJAR_SNIPPET_VERSION || "6";

  const gaEnabled = isEnabled(ga4);
  const hjEnabled = isEnabled(hjId);

  return (
    <>
      {gaEnabled && (
        <>
          <Script
            id="ga4-lib"
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {hjEnabled && (
        <Script id="hotjar-init" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${JSON.stringify(hjId)},hjsv:${JSON.stringify(hjVer)}};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      )}
    </>
  );
}
