---
layout: ../layouts/Document.astro
title: Privacy Policy — Paglyph
description: How Paglyph handles your account, reading content, and vocabulary library.
---

# Paglyph Privacy Policy

**Last updated: October 13, 2026**

## Overview

Paglyph is a reading companion and vocabulary-learning app operated by Aditya Rohman, based in Indonesia. This policy explains how information is handled when you use the app and contact us.

Your vocabulary library is stored on your device. You can synchronize it through your Apple iCloud account. Online dictionary and AI features process selected reading text through our API and the providers described below.

## Data We Collect

**Account information.** Sign in with Apple provides an identifier used to authenticate your Paglyph account. Your name and email address, when supplied by Apple, are stored on your device for your account profile. Your email may be an Apple private relay address. Our backend processes Apple authentication credentials and account identifiers. We do not receive your Apple Account password.

**Reading content.** Paglyph processes page images on your device to extract text. Dictionary and AI requests send the selected word, sentence, and any supplied surrounding context or explanation preferences to our API. Page images are not uploaded to the dictionary or AI API or synchronized as part of your vocabulary library.

Saved words, sentences, definitions, lookup responses, and review progress are stored on-device. When iCloud sync is enabled and available, these library records synchronize through CloudKit. Learning preferences, including review goals and reminder settings, also synchronize through iCloud.

**Account activity and technical information.** We process session identifiers, authentication and deletion records, AI usage counters, and temporary request identifiers or protected request fingerprints. These support account access, usage allowances, duplicate-request handling, and security. Service infrastructure also processes IP addresses and request metadata to deliver and protect the service.

**Crash information.** Sentry receives crash reports, session-health information, and associated diagnostic context, such as app version, operating system, device information, and diagnostic identifiers. Session-health monitoring measures stability; it does not record a video of your session. Our app configuration disables session replay, screenshots, view-hierarchy attachments, performance tracing, profiling, and Sentry logs. Default personally identifiable information collection is disabled, but this does not make all diagnostic information anonymous.

**Purchases.** Apple and RevenueCat process subscription and transaction information needed to provide access and restore purchases. RevenueCat uses an app user identifier to associate subscription access with your account, or an anonymous identifier when you are not signed in. Paglyph does not receive your full payment-card details.

**Support.** If you email us, we receive your address, correspondence, and any attachments you choose to provide.

## How We Use Data

We use information to:

- Authenticate accounts and maintain secure sessions.
- Provide dictionary definitions and contextual AI explanations.
- Save vocabulary, schedule reviews, and synchronize your library and preferences.
- Manage subscriptions and restore purchases.
- Enforce AI allowances and prevent duplicate requests or abuse.
- Diagnose crashes and maintain service reliability.
- Respond to support and privacy requests.

## Sharing

We share information with providers needed to deliver the relevant feature. Not every provider receives every category of information. In particular, crash reporting and subscription management are not intended to receive your reading passages.

We do not sell personal information or share it for advertising across other companies’ apps and websites. We may disclose information where required by applicable law.

## Third-Party Services

**Apple.** Sign in with Apple supports authentication. CloudKit and iCloud synchronize library records and learning preferences when enabled. Apple In-App Purchase processes payments and subscriptions. [Apple Privacy Policy](https://www.apple.com/legal/privacy/en-ww/)

**Cloudflare.** Cloudflare Workers and D1 host our API and process account records, usage counters, dictionary requests, and operational information. Reading text passes through the API to provide the requested result. [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/)

**OpenRouter and AI providers.** The released app uses paid AI models through OpenRouter. AI explanations send relevant reading text, dictionary candidates, and explanation preferences to OpenRouter, which routes the request to the provider serving the selected model. Provider selection may vary with the model and availability. We do not intentionally include your Paglyph account ID, email, name, session credentials, or subscription details in the AI prompt. Reading text itself may contain personal information.

For these paid AI requests, we set OpenRouter’s provider data-collection option to “deny”. We use this restriction to exclude providers that permit training on submitted data under their declared policies. This restriction is not a guarantee of zero retention. OpenRouter and the serving provider may process request metadata and retain information under their applicable policies, including for security or legal purposes. See [OpenRouter’s Privacy Policy](https://openrouter.ai/privacy) and its [provider data policies](https://openrouter.ai/docs/guides/privacy/provider-logging).

**Sentry.** Sentry provides crash reporting and session-health monitoring. Diagnostic retention follows the settings and terms applicable to our Sentry service. [Sentry Privacy Policy](https://sentry.io/privacy/)

**RevenueCat.** RevenueCat processes app user identifiers, subscription and transaction records, and relevant technical information to manage subscription entitlements and restoration. [RevenueCat Privacy Policy](https://www.revenuecat.com/privacy)

**Support email.** You can contact us at adityarohman@paglyph.app. Our email service provider processes your email address, messages, and any attachments to deliver and store support correspondence.

## Data Retention

- **Account records:** We retain records needed to maintain your account while it remains active. When you request deletion, we disable the account and revoke Paglyph sessions. Account erasure proceeds after retained Apple authorizations have been successfully revoked; temporary failures are retried.
- **AI usage counters:** We retain account-associated usage records to enforce allowances and handle usage questions. Account deletion removes associated account records through the deletion process.
- **Deletion and security markers:** A protected identifier derived from your Apple identifier, relevant timestamps, and limited usage information can remain after account deletion to prevent replay and allowance-reset abuse. These records expire after 35 days and are removed by scheduled cleanup. They are pseudonymous, not anonymous.
- **Temporary request records:** Records used to recognize duplicate AI requests have a 24-hour expiry and are removed through cleanup. They use request fingerprints rather than storing the reading passage or generated explanation as retry history.
- **Backend operational logs:** Our retention policy is up to 30 days, or a shorter configured period. These logs do not include reading passages, AI-generated explanations, or authentication credentials.
- **Vocabulary and lookup cache:** Your vocabulary library is stored on your device and, when enabled, synchronized through Apple’s iCloud. We do not store your vocabulary library in our API database. Saved library records remain until you delete them. Cached lookup responses are stored separately and can be cleared in the app. Deleting your Paglyph account does not delete the library or its iCloud copies.
- **Support correspondence:** We retain support messages for 12 months after a conversation closes, unless needed for an unresolved matter or an applicable obligation.
- **Provider records and recovery copies:** Sentry, OpenRouter, serving AI providers, Apple, RevenueCat, and infrastructure providers apply their own applicable retention and deletion practices. Deletion from active systems may precede expiry from recovery copies. We do not promise immediate deletion of all third-party records or backups.

## Security

We use HTTPS for API communications, iOS Keychain storage for account credentials, server-side credential protection, and access controls. Session tokens are stored as hashes on the backend, and retained Apple refresh credentials are encrypted. Provider secrets are not embedded in the app.

No storage or transmission method guarantees absolute security. Online AI processing is not end-to-end encrypted against the providers processing the request.

## Your Choices & Rights

You can delete saved words from your library. When iCloud sync is enabled, deletions synchronize when connectivity and iCloud availability allow. Devices that are offline may retain earlier copies until synchronization occurs.

You can turn iCloud sync on or off in the app. Changing the setting requires restarting the app. Turning sync off is not a request to erase existing iCloud records.

You can clear cached lookup responses separately from your saved library.

Account deletion is available in the app’s account settings. **Deleting your account signs you out and deletes the backend account through the process described above; it does not delete saved words or your iCloud library.** Manage those records separately through the library and applicable iCloud controls.

Uninstalling the app does not itself delete your backend account or iCloud records. Account deletion also does not automatically cancel an Apple subscription. Manage or cancel subscriptions in Apple’s subscription settings.

Depending on applicable law, you may have rights to access, correct, delete, obtain a copy of, or restrict certain processing of your personal information, withdraw consent where applicable, or complain to a relevant authority. Contact us to make a request. We may need to verify your identity. We cannot remotely erase files from an offline device through an email request.

## Children’s Privacy

Paglyph is intended for adults aged 18 and older. It is not intended for children or teenagers under 18. If you believe an underage person has provided personal information to us, contact us so we can investigate and address it.

## International Transfers

Aditya Rohman operates from Indonesia. Our providers may process information outside Indonesia and your country of residence. The current Sentry integration uses its US ingestion endpoint. We do not promise that all data remains in one country.

Provider processing is subject to applicable service and data-protection terms. Applicable rights remain available through the contact details below.

## App Tracking Transparency

Paglyph does not track users across other companies’ apps or websites for targeted advertising or advertising measurement as defined by Apple. Account identifiers, subscription information, security records, and crash diagnostics are still processed for the purposes described in this policy.

## Push Notifications

The MVP uses local review reminders scheduled on your device, rather than remote push notifications through Firebase. Reminder text is generic and does not include the words or sentences in your library.

You can manage reminders in Paglyph and notification permission in iOS Settings. Local reminders do not require sending your library to a push-notification provider.

## Website Waitlist

The waitlist form on our website asks for your email address to register your interest in Paglyph. Joining the waitlist does not create an app account or send reading content to the app’s providers.

To ask about your waitlist information or request its removal, contact adityarohman@paglyph.app.

## Contact Us

**Aditya Rohman**  
Indonesia  
**Email:** adityarohman@paglyph.app  
**Website:** https://paglyph.app/

## Changes to This Policy

We will update this page when our data practices change and revise the date above. Where applicable law requires additional notice or consent, we will provide it before the relevant change takes effect.
