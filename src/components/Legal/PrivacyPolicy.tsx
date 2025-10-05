import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, Database, Lock, Eye, Users, Globe, Cookie, AlertCircle } from 'lucide-react'
import siteConfig from '../../config/site.config.json'

export const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sections = [
    { id: 'introduction', title: '1. Introduction', icon: <Shield /> },
    { id: 'collection', title: '2. Information We Collect', icon: <Database /> },
    { id: 'usage', title: '3. How We Use Information', icon: <Eye /> },
    { id: 'sharing', title: '4. Information Sharing', icon: <Users /> },
    { id: 'security', title: '5. Data Security', icon: <Lock /> },
    { id: 'retention', title: '6. Data Retention', icon: <Database /> },
    { id: 'rights', title: '7. Your Rights', icon: <Users /> },
    { id: 'cookies', title: '8. Cookies & Analytics', icon: <Cookie /> },
    { id: 'third-party', title: '9. Third-Party Services', icon: <Globe /> },
    { id: 'contact', title: '10. Contact Information', icon: <AlertCircle /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gta-black to-gta-graphite">
      {/* Header */}
      <div className="bg-gta-graphite/90 backdrop-blur-sm border-b border-gta-medium sticky top-0 z-40">
        <div className="container-gta py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-gta-light hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="container-gta py-12">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <Lock className="w-16 h-16 text-gta-gold mx-auto mb-4" />
            <h1 className="text-5xl md:text-7xl font-bebas text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gta-light">
              Last updated: {new Date(siteConfig.legal.lastUpdated).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* GDPR Notice */}
          <div className="card-gta bg-gta-green/10 border border-gta-green/30 mb-12">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-gta-green flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bebas text-gta-green mb-2">GDPR Compliant</h3>
                <p className="text-gta-light text-sm">
                  This privacy policy complies with the General Data Protection Regulation (GDPR) 
                  and other applicable data protection laws. We are committed to protecting your privacy 
                  and handling your data transparently.
                </p>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="card-gta mb-12">
            <h2 className="text-2xl font-bebas text-gta-gold mb-4">Table of Contents</h2>
            <div className="grid md:grid-cols-2 gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 p-3 hover:bg-gta-dark/50 transition-colors rounded"
                >
                  <span className="text-gta-green">{section.icon}</span>
                  <span className="text-white">{section.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <section id="introduction" className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">1. Introduction</h2>
              <div className="space-y-4 text-gta-light">
                <p>
                  Welcome to our FiveM Roleplay Server. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you play on our server or interact 
                  with our community platforms.
                </p>
                <p>
                  By accessing our server, you consent to the data practices described in this policy. 
                  If you do not agree with this policy, please do not use our services.
                </p>
              </div>
            </section>

            <section id="collection" className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">2. Information We Collect</h2>
              <div className="space-y-4 text-gta-light">
                <h3 className="text-xl font-bebas text-gta-gold">Automatically Collected</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>FiveM License (unique player identifier)</li>
                  <li>Steam ID / Discord ID</li>
                  <li>IP Address (for security and anti-cheat purposes)</li>
                  <li>Hardware identifiers (for ban enforcement)</li>
                  <li>Connection timestamps and session duration</li>
                  <li>In-game actions and chat logs</li>
                </ul>

                <h3 className="text-xl font-bebas text-gta-gold mt-6">Information You Provide</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Whitelist application details (age, experience, etc.)</li>
                  <li>Discord username and profile information</li>
                  <li>Email address (if provided for notifications)</li>
                  <li>Character names and backstories</li>
                  <li>Support ticket contents</li>
                  <li>Forum posts and comments</li>
                </ul>

                <h3 className="text-xl font-bebas text-gta-gold mt-6">Gameplay Data</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Character statistics and inventory</li>
                  <li>Property and vehicle ownership</li>
                  <li>Financial transactions</li>
                  <li>Job history and progression</li>
                  <li>Faction/gang affiliations</li>
                </ul>
              </div>
            </section>

            <section id="usage" className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">3. How We Use Information</h2>
              <div className="space-y-4 text-gta-light">
                <p>We use the collected information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and maintain server functionality</li>
                  <li>Enforce server rules and prevent cheating</li>
                  <li>Process whitelist applications</li>
                  <li>Investigate rule violations and appeals</li>
                  <li>Improve gameplay experience and balance</li>
                  <li>Communicate important server updates</li>
                  <li>Generate server statistics and analytics</li>
                  <li>Prevent ban evasion and multi-accounting</li>
                  <li>Backup and restore player data</li>
                </ul>
              </div>
            </section>

            <section id="sharing" className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">4. Information Sharing</h2>
              <div className="space-y-4 text-gta-light">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. 
                  We may share information in the following situations:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With other staff members for administrative purposes</li>
                  <li>When required by law or legal process</li>
                  <li>To protect against fraud or security threats</li>
                  <li>With FiveM/Cfx.re for platform compliance</li>
                  <li>Public leaderboards (character names only)</li>
                </ul>

                <div className="bg-gta-dark/50 p-4 rounded border-l-4 border-gta-gold mt-6">
                  <p className="text-sm">
                    <strong>Note:</strong> Ban information may be shared with other servers 
                    in our partner network to maintain community standards.
                  </p>
                </div>
              </div>
            </section>

            <section id="security" className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">5. Data Security</h2>
              <div className="space-y-4 text-gta-light">
                <p>
                  We implement appropriate technical and organizational measures to protect your data:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encrypted database storage</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited staff access to sensitive data</li>
                  <li>Secure backup procedures</li>
                  <li>DDoS protection and firewall systems</li>
                  <li>Two-factor authentication for admin accounts</li>
                </ul>
                <p className="mt-4">
                  However, no method of transmission over the Internet is 100% secure, and we cannot 
                  guarantee absolute security of your data.
                </p>
              </div>
            </section>

            <section id="retention" className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">6. Data Retention</h2>
              <div className="space-y-4 text-gta-light">
                <p>We retain your information for the following periods:</p>
                <table className="w-full mt-4">
                  <thead>
                    <tr className="border-b border-gta-medium">
                      <th className="text-left py-2 text-gta-gold">Data Type</th>
                      <th className="text-left py-2 text-gta-gold">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-gta-dark">
                      <td className="py-2">Character Data</td>
                      <td className="py-2">{siteConfig.legal.dataRetention.characterData}</td>
                    </tr>
                    <tr className="border-b border-gta-dark">
                      <td className="py-2">Chat Logs</td>
                      <td className="py-2">{siteConfig.legal.dataRetention.chatLogs}</td>
                    </tr>
                    <tr className="border-b border-gta-dark">
                      <td className="py-2">Connection Logs</td>
                      <td className="py-2">{siteConfig.legal.dataRetention.connectionLogs}</td>
                    </tr>
                    <tr className="border-b border-gta-dark">
                      <td className="py-2">Ban Records</td>
                      <td className="py-2">{siteConfig.legal.dataRetention.banRecords}</td>
                    </tr>
                    <tr className="border-b border-gta-dark">
                      <td className="py-2">Whitelist Applications</td>
                      <td className="py-2">{siteConfig.legal.dataRetention.whitelistApplications}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="rights" className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">7. Your Rights</h2>
              <div className="space-y-4 text-gta-light">
                <p>Under GDPR and applicable laws, you have the following rights:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                  <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                  <li><strong>Portability:</strong> Receive your data in a portable format</li>
                  <li><strong>Objection:</strong> Object to certain data processing</li>
                  <li><strong>Restriction:</strong> Limit how we use your data</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, contact our Data Protection Officer via Discord ticket 
                  or email. We will respond within 30 days.
                </p>
              </div>
            </section>

            <section id="cookies" className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">8. Cookies & Analytics</h2>
              <div className="space-y-4 text-gta-light">
                <p>
                  Our website uses cookies and similar technologies to enhance user experience:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Session cookies for authentication</li>
                  <li>Preference cookies for language/theme settings</li>
                  <li>Analytics cookies to understand usage patterns</li>
                  <li>Security cookies to prevent fraud</li>
                </ul>
                <p className="mt-4">
                  You can control cookie settings through your browser. Disabling cookies may 
                  affect website functionality.
                </p>
              </div>
            </section>

            <section id="third-party" className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">9. Third-Party Services</h2>
              <div className="space-y-4 text-gta-light">
                <p>We integrate with the following third-party services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Discord:</strong> Community communication and authentication</li>
                  <li><strong>FiveM/Cfx.re:</strong> Game server platform</li>
                  <li><strong>Steam:</strong> Player identification</li>
                  <li><strong>CloudFlare:</strong> DDoS protection and CDN</li>
                  <li><strong>PayPal/Stripe:</strong> Donation processing (optional)</li>
                </ul>
                <p className="mt-4">
                  These services have their own privacy policies. We recommend reviewing them 
                  to understand how they handle your data.
                </p>
              </div>
            </section>

            <section id="contact" className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">10. Contact Information</h2>
              <div className="space-y-4 text-gta-light">
                <p>
                  For privacy-related questions or concerns, contact us through:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Discord: Create a privacy ticket in #support</li>
                  <li>Email: {siteConfig.legal.privacyEmail}</li>
                  <li>Data Protection Officer: {siteConfig.legal.dpoEmail}</li>
                </ul>
                <p className="mt-4">
                  Response time: Within 48 hours for general inquiries, 30 days for formal requests.
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section className="card-gta bg-gta-dark/50">
              <h2 className="text-3xl font-bebas text-white mb-4">Children's Privacy</h2>
              <div className="space-y-4 text-gta-light">
                <p>
                  Our server is not intended for children under {siteConfig.legal.minAge}. We do not knowingly collect 
                  personal information from children under 16. If we discover such information 
                  has been collected, we will delete it immediately.
                </p>
              </div>
            </section>

            {/* Updates */}
            <section className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">Policy Updates</h2>
              <div className="space-y-4 text-gta-light">
                <p>
                  We may update this Privacy Policy periodically. Changes will be posted on this 
                  page with an updated revision date. Significant changes will be announced via 
                  Discord and server notifications.
                </p>
                <p>
                  Continued use of our services after changes constitutes acceptance of the 
                  updated policy.
                </p>
              </div>
            </section>
          </div>

          {/* Footer CTA */}
          <div className="card-gta mt-12 text-center bg-gradient-to-br from-gta-dark to-gta-graphite">
            <h2 className="text-2xl font-bebas text-white mb-4">Have Questions?</h2>
            <p className="text-gta-light mb-6">
              We're committed to transparency. Contact our team for any privacy concerns.
            </p>
            <a 
              href={siteConfig.social.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gta-gold inline-block"
            >
              Contact Privacy Team
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}