import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, FileText, AlertTriangle, Shield, Users, DollarSign, Ban, Video } from 'lucide-react'
import siteConfig from '../../config/site.config.json'

export const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms', icon: <FileText /> },
    { id: 'eligibility', title: '2. Eligibility & Access', icon: <Users /> },
    { id: 'conduct', title: '3. Code of Conduct', icon: <Shield /> },
    { id: 'accounts', title: '4. Account Policies', icon: <Users /> },
    { id: 'violations', title: '5. Violations & Penalties', icon: <Ban /> },
    { id: 'donations', title: '6. Donations & Perks', icon: <DollarSign /> },
    { id: 'content', title: '7. Content Creation', icon: <Video /> },
    { id: 'liability', title: '8. Limitation of Liability', icon: <AlertTriangle /> }
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
            <Shield className="w-16 h-16 text-gta-gold mx-auto mb-4" />
            <h1 className="text-5xl md:text-7xl font-bebas text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gta-light">
              Last updated: {new Date(siteConfig.legal.lastUpdated).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
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
            <section id="acceptance" className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-gta-light">
                <p>
                  By connecting to our FiveM server, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, you may not access or use our server.
                </p>
                <p>
                  These terms apply to all players, staff members, and visitors of our roleplay community. 
                  We reserve the right to update these terms at any time without prior notice.
                </p>
              </div>
            </section>

            <section id="eligibility" className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">2. Eligibility & Access</h2>
              <div className="space-y-4 text-gta-light">
                <h3 className="text-xl font-bebas text-gta-gold">Age Requirements</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You must be at least {siteConfig.legal.minAge} years old to play on our server</li>
                  <li>Players under 18 require parental consent</li>
                  <li>Age verification may be required for whitelist applications</li>
                </ul>

                <h3 className="text-xl font-bebas text-gta-gold mt-6">Whitelist System</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All players must pass our whitelist application</li>
                  <li>Applications are reviewed within 48-72 hours</li>
                  <li>False information will result in permanent ban</li>
                  <li>Whitelist status is non-transferable</li>
                </ul>
              </div>
            </section>

            <section id="conduct" className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">3. Code of Conduct</h2>
              <div className="space-y-4 text-gta-light">
                <h3 className="text-xl font-bebas text-gta-gold">Prohibited Behavior</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Harassment, discrimination, or hate speech</li>
                  <li>Exploiting, cheating, or using unauthorized modifications</li>
                  <li>Real-world trading of in-game assets</li>
                  <li>Impersonating staff members</li>
                  <li>Sharing personal information of other players</li>
                  <li>Stream sniping or metagaming</li>
                </ul>

                <h3 className="text-xl font-bebas text-gta-gold mt-6">Roleplay Standards</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Maintain character immersion at all times</li>
                  <li>No breaking character in public areas</li>
                  <li>Respect ongoing roleplay scenarios</li>
                  <li>Follow New Life Rule (NLR) after death</li>
                  <li>Comply with Fear RP guidelines</li>
                </ul>
              </div>
            </section>

            <section id="accounts" className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">4. Account Policies</h2>
              <div className="space-y-4 text-gta-light">
                <p>
                  Each player is allowed one account only. Account sharing is strictly prohibited 
                  and will result in permanent suspension of all involved accounts.
                </p>
                <h3 className="text-xl font-bebas text-gta-gold">Account Security</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You are responsible for your account security</li>
                  <li>Use strong, unique passwords</li>
                  <li>Enable two-factor authentication on Discord</li>
                  <li>Report compromised accounts immediately</li>
                </ul>
              </div>
            </section>

            <section id="violations" className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">5. Violations & Penalties</h2>
              <div className="space-y-4 text-gta-light">
                <h3 className="text-xl font-bebas text-gta-gold">Warning System</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>1st Offense: Verbal warning</li>
                  <li>2nd Offense: 24-hour ban</li>
                  <li>3rd Offense: 7-day ban</li>
                  <li>4th Offense: 30-day ban</li>
                  <li>5th Offense: Permanent ban</li>
                </ul>

                <div className="bg-gta-dark/50 p-4 rounded border-l-4 border-gta-gold mt-6">
                  <p className="text-sm">
                    <strong>Note:</strong> Severe violations may result in immediate permanent ban 
                    without prior warnings.
                  </p>
                </div>
              </div>
            </section>

            <section id="donations" className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">6. Donations & Perks</h2>
              <div className="space-y-4 text-gta-light">
                <p>
                  Donations help maintain server costs and development. All donations are voluntary 
                  and non-refundable.
                </p>
                <h3 className="text-xl font-bebas text-gta-gold">Donation Perks</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Priority queue access</li>
                  <li>Exclusive vehicles and clothing</li>
                  <li>Custom license plates</li>
                  <li>Additional character slots</li>
                  <li>Special Discord role and channels</li>
                </ul>
                <p className="mt-4">
                  Donation perks do not grant immunity from rules or preferential treatment in roleplay.
                </p>
              </div>
            </section>

            <section id="content" className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">7. Content Creation</h2>
              <div className="space-y-4 text-gta-light">
                <p>
                  We encourage content creation and streaming. By playing on our server, you grant us 
                  permission to use your content for promotional purposes.
                </p>
                <h3 className="text-xl font-bebas text-gta-gold">Content Guidelines</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Include server name in stream titles</li>
                  <li>No monetization of server-specific content without permission</li>
                  <li>Respect other players' privacy preferences</li>
                  <li>Hide sensitive UI elements when streaming</li>
                </ul>
              </div>
            </section>

            <section id="liability" className="card-gta">
              <h2 className="text-3xl font-bebas text-white mb-4">8. Limitation of Liability</h2>
              <div className="space-y-4 text-gta-light">
                <p>
                  The server is provided "as is" without warranties of any kind. We are not responsible 
                  for any loss of game progress, virtual items, or data.
                </p>
                <p>
                  We reserve the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Modify or discontinue the server at any time</li>
                  <li>Reset player data for technical or gameplay reasons</li>
                  <li>Change game mechanics and economy balance</li>
                  <li>Remove inactive players from whitelist</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Contact */}
          <div className="card-gta mt-12 text-center">
            <h2 className="text-2xl font-bebas text-white mb-4">Questions?</h2>
            <p className="text-gta-light mb-6">
              If you have any questions about these Terms of Service, please contact our admin team.
            </p>
            <a 
              href={siteConfig.social.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gta-gold inline-block"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}