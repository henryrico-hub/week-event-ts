const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-gray-700 font-sans px-4 py-8 max-w-3xl mx-auto">
      {/* Logo */}
      <div className="flex justify-center mb-12"></div>

      {/* Title */}
      <div className="mb-2">
        <h1 id="privacyPolicy" className="text-3xl font-bold text-black">
          PRIVACY POLICY
        </h1>
      </div>
      <div className="mb-8">
        <span className="text-sm text-gray-500 font-semibold">
          Last updated <span className="font-normal">August 07, 2025</span>
        </span>
      </div>

      {/* Intro */}
      <div className="mb-8 leading-relaxed text-gray-600">
        <p>
          This Privacy Notice for <span className="font-semibold">SpiritC</span>{" "}
          ("we," "us," or "our"), describes how and why we might access,
          collect, store, use, and/or share ("process") your personal
          information when you use our services ("Services"), including when
          you:
        </p>
        <ul className="list-square ml-6 mt-4 space-y-2">
          <li>
            Visit our website at{" "}
            <a
              href="https://spiritc.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline break-words"
            >
              https://spiritc.netlify.app/
            </a>{" "}
            or any website of ours that links to this Privacy Notice
          </li>
          <li>
            Download and use our mobile application, or any other application of
            ours that links to this Privacy Notice
          </li>
          <li>
            Engage with us in other related ways, including any sales,
            marketing, or events
          </li>
        </ul>
        <p className="mt-4">
          <strong>Questions or concerns?</strong> Reading this Privacy Notice
          will help you understand your privacy rights and choices. We are
          responsible for making decisions about how your personal information
          is processed. If you do not agree with our policies and practices,
          please do not use our Services. If you still have any questions or
          concerns, please contact us at{" "}
          <a
            href="mailto:privacy@gmail.com"
            className="text-blue-700 underline"
          >
            privacy@gmail.com
          </a>
          .
        </p>
      </div>

      {/* Summary of Key Points */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-black mb-2">
          SUMMARY OF KEY POINTS
        </h2>
        <p className="mb-2">
          <strong>
            <em>
              This summary provides key points from our Privacy Notice, but you
              can find out more details about any of these topics by clicking
              the link following each key point or by using our{" "}
              <a href="#toc" className="text-blue-700 underline">
                table of contents
              </a>{" "}
              below to find the section you are looking for.
            </em>
          </strong>
        </p>
        <ul className="list-square ml-6 space-y-2">
          <li>
            <strong>What personal information do we process?</strong> When you
            visit, use, or navigate our Services, we may process personal
            information depending on how you interact with us and the Services,
            the choices you make, and the products and features you use. Learn
            more about{" "}
            <a href="#personalinfo" className="text-blue-700 underline">
              personal information you disclose to us
            </a>
            .
          </li>
          <li>
            <strong>Do we process any sensitive personal information?</strong>{" "}
            Some of the information may be considered "special" or "sensitive"
            in certain jurisdictions, for example your racial or ethnic origins,
            sexual orientation, and religious beliefs. We do not process
            sensitive personal information.
          </li>
          <li>
            <strong>Do we collect any information from third parties?</strong>{" "}
            We do not collect any information from third parties.
          </li>
          <li>
            <strong>How do we process your information?</strong> We process your
            information to provide, improve, and administer our Services,
            communicate with you, for security and fraud prevention, and to
            comply with law. We may also process your information for other
            purposes with your consent. We process your information only when we
            have a valid legal reason to do so. Learn more about{" "}
            <a href="#infouse" className="text-blue-700 underline">
              how we process your information
            </a>
            .
          </li>
          <li>
            <strong>
              In what situations and with which parties do we share personal
              information?
            </strong>{" "}
            We may share information in specific situations and with specific
            third parties. Learn more about{" "}
            <a href="#whoshare" className="text-blue-700 underline">
              when and with whom we share your personal information
            </a>
            .
          </li>
          <li>
            <strong>How do we keep your information safe?</strong> We have
            adequate organizational and technical processes and procedures in
            place to protect your personal information. However, no electronic
            transmission over the internet or information storage technology can
            be guaranteed to be 100% secure, so we cannot promise or guarantee
            that hackers, cybercriminals, or other unauthorized third parties
            will not be able to defeat our security and improperly collect,
            access, steal, or modify your information. Learn more about{" "}
            <a href="#infosafe" className="text-blue-700 underline">
              how we keep your information safe
            </a>
            .
          </li>
          <li>
            <strong>What are your rights?</strong> Depending on where you are
            located geographically, the applicable privacy law may mean you have
            certain rights regarding your personal information. Learn more about{" "}
            <a href="#privacyrights" className="text-blue-700 underline">
              your privacy rights
            </a>
            .
          </li>
          <li>
            <strong>How do you exercise your rights?</strong> The easiest way to
            exercise your rights is by{" "}
            <a
              href="https://app.termly.io/notify/099148a4-037e-488b-a655-fb8172144781"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline"
            >
              submitting a data subject access request
            </a>
            , or by contacting us. We will consider and act upon any request in
            accordance with applicable data protection laws.
          </li>
        </ul>
        <p className="mt-4">
          Want to learn more about what we do with any information we collect?{" "}
          <a href="#toc" className="text-blue-700 underline">
            Review the Privacy Notice in full
          </a>
          .
        </p>
      </div>

      {/* Table of Contents */}
      <div id="toc" className="mb-8">
        <h2 className="text-xl font-bold text-black mb-2">TABLE OF CONTENTS</h2>
        <ol className="list-decimal ml-6 space-y-1">
          <li>
            <a href="#infocollect" className="text-blue-700 underline">
              WHAT INFORMATION DO WE COLLECT?
            </a>
          </li>
          <li>
            <a href="#infouse" className="text-blue-700 underline">
              HOW DO WE PROCESS YOUR INFORMATION?
            </a>
          </li>
          <li>
            <a href="#whoshare" className="text-blue-700 underline">
              WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
            </a>
          </li>
          <li>
            <a href="#3pwebsites" className="text-blue-700 underline">
              WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?
            </a>
          </li>
          <li>
            <a href="#inforetain" className="text-blue-700 underline">
              HOW LONG DO WE KEEP YOUR INFORMATION?
            </a>
          </li>
          <li>
            <a href="#infosafe" className="text-blue-700 underline">
              HOW DO WE KEEP YOUR INFORMATION SAFE?
            </a>
          </li>
          <li>
            <a href="#privacyrights" className="text-blue-700 underline">
              WHAT ARE YOUR PRIVACY RIGHTS?
            </a>
          </li>
          <li>
            <a href="#DNT" className="text-blue-700 underline">
              CONTROLS FOR DO-NOT-TRACK FEATURES
            </a>
          </li>
          <li>
            <a href="#policyupdates" className="text-blue-700 underline">
              DO WE MAKE UPDATES TO THIS NOTICE?
            </a>
          </li>
          <li>
            <a href="#contact" className="text-blue-700 underline">
              HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
            </a>
          </li>
          <li>
            <a href="#request" className="text-blue-700 underline">
              HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
              YOU?
            </a>
          </li>
        </ol>
      </div>

      {/* Section 1 */}
      <div id="infocollect" className="mb-8">
        <h2 className="text-xl font-bold text-black mb-2">
          1. WHAT INFORMATION DO WE COLLECT?
        </h2>
        <h3 id="personalinfo" className="text-lg font-semibold text-black mb-2">
          Personal information you disclose to us
        </h3>
        <p className="mb-2 text-gray-600">
          <strong>
            <em>In Short:</em>
          </strong>{" "}
          We collect personal information that you provide to us.
        </p>
        <p className="mb-2 text-gray-600">
          We collect personal information that you voluntarily provide to us
          when you express an interest in obtaining information about us or our
          products and Services, when you participate in activities on the
          Services, or otherwise when you contact us.
        </p>
        <p className="mb-2 text-gray-600">
          <strong>Personal Information Provided by You.</strong> The personal
          information that we collect depends on the context of your
          interactions with us and the Services, the choices you make, and the
          products and features you use. The personal information we collect may
          include the following:
        </p>
        <ul className="list-square ml-6 space-y-1">
          <li>names</li>
          <li>phone numbers</li>
          <li>email addresses</li>
          <li>mailing addresses</li>
          <li>contact preferences</li>
          <li>contact or authentication data</li>
          <li>billing addresses</li>
        </ul>
        <div className="mt-4">
          <strong>Sensitive Information.</strong> We do not process sensitive
          information.
        </div>
        <div className="mt-4">
          <strong>Application Data.</strong> If you use our application(s), we
          also may collect the following information if you choose to provide us
          with access or permission:
          <ul className="list-square ml-6 mt-2">
            <li>
              <em>Mobile Device Access.</em> We may request access or permission
              to certain features from your mobile device, including your mobile
              device's camera, and other features. If you wish to change our
              access or permissions, you may do so in your device's settings.
            </li>
          </ul>
        </div>
        <p className="mt-4 text-gray-600">
          This information is primarily needed to maintain the security and
          operation of our application(s), for troubleshooting, and for our
          internal analytics and reporting purposes.
        </p>
        <p className="mt-2 text-gray-600">
          All personal information that you provide to us must be true,
          complete, and accurate, and you must notify us of any changes to such
          personal information.
        </p>
      </div>

      {/* Section 2 */}
      <div id="infouse" className="mb-8">
        <h2 className="text-xl font-bold text-black mb-2">
          2. HOW DO WE PROCESS YOUR INFORMATION?
        </h2>
        <p className="mb-2 text-gray-600">
          <strong>
            <em>In Short:</em>
          </strong>{" "}
          We process your information to provide, improve, and administer our
          Services, communicate with you, for security and fraud prevention, and
          to comply with law. We may also process your information for other
          purposes with your consent.
        </p>
        <p className="mb-2 text-gray-600">
          We process your personal information for a variety of reasons,
          depending on how you interact with our Services, including:
        </p>
        <ul className="list-square ml-6 space-y-1">
          <li>
            <strong>
              To deliver and facilitate delivery of services to the user.
            </strong>{" "}
            We may process your information to provide you with the requested
            service.
          </li>
          <li>
            <strong>
              To send you marketing and promotional communications.
            </strong>{" "}
            We may process the personal information you send to us for our
            marketing purposes, if this is in accordance with your marketing
            preferences. You can opt out of our marketing emails at any time.
            For more information, see{" "}
            <a href="#privacyrights" className="text-blue-700 underline">
              WHAT ARE YOUR PRIVACY RIGHTS?
            </a>{" "}
            below.
          </li>
          <li>
            <strong>To deliver targeted advertising to you.</strong> We may
            process your information to develop and display personalized content
            and advertising tailored to your interests, location, and more.
          </li>
          <li>
            <strong>
              To evaluate and improve our Services, products, marketing, and
              your experience.
            </strong>{" "}
            We may process your information when we believe it is necessary to
            identify usage trends, determine the effectiveness of our
            promotional campaigns, and to evaluate and improve our Services,
            products, marketing, and your experience.
          </li>
          <li>
            <strong>To identify usage trends.</strong> We may process
            information about how you use our Services to better understand how
            they are being used so we can improve them.
          </li>
          <li>
            <strong>
              To determine the effectiveness of our marketing and promotional
              campaigns.
            </strong>{" "}
            We may process your information to better understand how to provide
            marketing and promotional campaigns that are most relevant to you.
          </li>
        </ul>
      </div>

      {/* Section 3 */}
      <div id="whoshare" className="mb-8">
        <h2 className="text-xl font-bold text-black mb-2">
          3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
        </h2>
        <p className="mb-2 text-gray-600">
          <strong>
            <em>In Short:</em>
          </strong>{" "}
          We may share information in specific situations described in this
          section and/or with the following third parties.
        </p>
        <p className="mb-2 text-gray-600">
          We may need to share your personal information in the following
          situations:
        </p>
        <ul className="list-square ml-6 space-y-1">
          <li>
            <strong>Business Transfers.</strong> We may share or transfer your
            information in connection with, or during negotiations of, any
            merger, sale of company assets, financing, or acquisition of all or
            a portion of our business to another company.
          </li>
          <li>
            <strong>Affiliates.</strong> We may share your information with our
            affiliates, in which case we will require those affiliates to honor
            this Privacy Notice. Affiliates include our parent company and any
            subsidiaries, joint venture partners, or other companies that we
            control or that are under common control with us.
          </li>
          <li>
            <strong>Business Partners.</strong> We may share your information
            with our business partners to offer you certain products, services,
            or promotions.
          </li>
        </ul>
      </div>

      {/* Section 4 */}
      <div id="3pwebsites" className="mb-8">
        <h2 className="text-xl font-bold text-black mb-2">
          4. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?
        </h2>
        <p className="mb-2 text-gray-600">
          <strong>
            <em>In Short:</em>
          </strong>{" "}
          We are not responsible for the safety of any information that you
          share with third parties that we may link to or who advertise on our
          Services, but are not affiliated with, our Services.
        </p>
        <p className="mb-2 text-gray-600">
          The Services may link to third-party websites, online services, or
          mobile applications and/or contain advertisements from third parties
          that are not affiliated with us and which may link to other websites,
          services, or applications. Accordingly, we do not make any guarantee
          regarding any such third parties, and we will not be liable for any
          loss or damage caused by the use of such third-party websites,
          services, or applications. The inclusion of a link towards a
          third-party website, service, or application does not imply an
          endorsement by us. We cannot guarantee the safety and privacy of data
          you provide to any third-party websites. Any data collected by third
          parties is not covered by this Privacy Notice. We are not responsible
          for the content or privacy and security practices and policies of any
          third parties, including other websites, services, or applications
          that may be linked to or from the Services. You should review the
          policies of such third parties and contact them directly to respond to
          your questions.
        </p>
      </div>

      {/* Section 5 */}
      <div id="inforetain" className="mb-8">
        <h2 className="text-xl font-bold text-black mb-2">
          5. HOW LONG DO WE KEEP YOUR INFORMATION?
        </h2>
        <p className="mb-2 text-gray-600">
          <strong>
            <em>In Short:</em>
          </strong>{" "}
          We keep your information for as long as necessary to fulfill the
          purposes outlined in this Privacy Notice unless otherwise required by
          law.
        </p>
        <p className="mb-2 text-gray-600">
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this Privacy Notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements).
        </p>
        <p className="mb-2 text-gray-600">
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
        </p>
      </div>

      {/* Section 6 */}
      <div id="infosafe" className="mb-8">
        <h2 className="text-xl font-bold text-black mb-2">
          6. HOW DO WE KEEP YOUR INFORMATION SAFE?
        </h2>
        <p className="mb-2 text-gray-600">
          <strong>
            <em>In Short:</em>
          </strong>{" "}
          We aim to protect your personal information through a system of
          organizational and technical security measures.
        </p>
        <p className="mb-2 text-gray-600">
          We have implemented appropriate and reasonable technical and
          organizational security measures designed to protect the security of
          any personal information we process. However, despite our safeguards
          and efforts to secure your information, no electronic transmission
          over the Internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorized third parties will not be able
          to defeat our security and improperly collect, access, steal, or
          modify your information. Although we will do our best to protect your
          personal information, transmission of personal information to and from
          our Services is at your own risk. You should only access the Services
          within a secure environment.
        </p>
      </div>

      {/* Section 7 */}
      <div id="privacyrights" className="mb-8">
        <h2 className="text-xl font-bold text-black mb-2">
          7. WHAT ARE YOUR PRIVACY RIGHTS?
        </h2>
        <p className="mb-2 text-gray-600">
          <strong>
            <em>In Short:</em>
          </strong>{" "}
          You may review, change, or terminate your account at any time,
          depending on your country, province, or state of residence.
        </p>
        <div className="mb-2">
          <strong className="underline">Withdrawing your consent:</strong> If we
          are relying on your consent to process your personal information,
          which may be express and/or implied consent depending on the
          applicable law, you have the right to withdraw your consent at any
          time. You can withdraw your consent at any time by contacting us by
          using the contact details provided in the section{" "}
          <a href="#contact" className="text-blue-700 underline">
            HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
          </a>{" "}
          below.
        </div>
        <div className="mb-2">
          However, please note that this will not affect the lawfulness of the
          processing before its withdrawal nor, when applicable law allows, will
          it affect the processing of your personal information conducted in
          reliance on lawful processing grounds other than consent.
        </div>
        <div className="mb-2">
          <strong className="underline">
            Opting out of marketing and promotional communications:
          </strong>{" "}
          You can unsubscribe from our marketing and promotional communications
          at any time by clicking on the unsubscribe link in the emails that we
          send, or by contacting us using the details provided in the section{" "}
          <a href="#contact" className="text-blue-700 underline">
            HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
          </a>{" "}
          below. You will then be removed from the marketing lists. However, we
          may still communicate with you — for example, to send you
          service-related messages that are necessary for the administration and
          use of your account, to respond to service requests, or for other
          non-marketing purposes.
        </div>
        <div className="mb-2">
          If you have questions or comments about your privacy rights, you may
          email us at{" "}
          <a
            href="mailto:privacy@gmail.com"
            className="text-blue-700 underline"
          >
            privacy@gmail.com
          </a>
          .
        </div>
      </div>

      {/* Section 8 */}
      <div id="DNT" className="mb-8">
        <h2 className="text-xl font-bold text-black mb-2">
          8. CONTROLS FOR DO-NOT-TRACK FEATURES
        </h2>
        <p className="mb-2 text-gray-600">
          Most web browsers and some mobile operating systems and mobile
          applications include a Do-Not-Track ("DNT") feature or setting you can
          activate to signal your privacy preference not to have data about your
          online browsing activities monitored and collected. At this stage, no
          uniform technology standard for recognizing and implementing DNT
          signals has been finalized. As such, we do not currently respond to
          DNT browser signals or any other mechanism that automatically
          communicates your choice not to be tracked online. If a standard for
          online tracking is adopted that we must follow in the future, we will
          inform you about that practice in a revised version of this Privacy
          Notice.
        </p>
      </div>

      {/* Section 9 */}
      <div id="policyupdates" className="mb-8">
        <h2 className="text-xl font-bold text-black mb-2">
          9. DO WE MAKE UPDATES TO THIS NOTICE?
        </h2>
        <p className="mb-2 text-gray-600">
          <strong>
            <em>In Short:</em>
          </strong>{" "}
          Yes, we will update this notice as necessary to stay compliant with
          relevant laws.
        </p>
        <p className="mb-2 text-gray-600">
          We may update this Privacy Notice from time to time. The updated
          version will be indicated by an updated "Revised" date at the top of
          this Privacy Notice. If we make material changes to this Privacy
          Notice, we may notify you either by prominently posting a notice of
          such changes or by directly sending you a notification. We encourage
          you to review this Privacy Notice frequently to be informed of how we
          are protecting your information.
        </p>
      </div>

      {/* Section 10 */}
      <div id="contact" className="mb-8">
        <h2 className="text-xl font-bold text-black mb-2">
          10. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
        </h2>
        <p className="mb-2 text-gray-600">
          If you have questions or comments about this notice, you may email us
          at{" "}
          <a
            href="mailto:privacy@gmail.com"
            className="text-blue-700 underline"
          >
            privacy@gmail.com
          </a>{" "}
          or contact us by post at:
        </p>
        <div className="ml-6 text-gray-600">
          <div>SpiritC</div>
          <div>Av. Madero</div>
          <div>Huber Sanders Trader</div>
          <div>Tepic, Nayarit 54345</div>
          <div>Qatar</div>
        </div>
      </div>

      {/* Section 11 */}
      <div id="request" className="mb-8">
        <h2 className="text-xl font-bold text-black mb-2">
          11. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
          YOU?
        </h2>
        <p className="mb-2 text-gray-600">
          Based on the applicable laws of your country, you may have the right
          to request access to the personal information we collect from you,
          details about how we have processed it, correct inaccuracies, or
          delete your personal information. You may also have the right to
          withdraw your consent to our processing of your personal information.
          These rights may be limited in some circumstances by applicable law.
          To request to review, update, or delete your personal information,
          please{" "}
          <a
            href="https://app.termly.io/notify/099148a4-037e-488b-a655-fb8172144781"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            fill out and submit a data subject access request
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
