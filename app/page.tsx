'use client';

import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  ExternalLink,
  BarChart3,
  Server,
  Shield,
  Clock,
  Users,
  Code,
  Database,
  Cog,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

export default function LMISProposal() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title:
        'PROPOSAL FOR THE DEVELOPMENT OF A LABORATORY MANAGEMENT INFORMATION SYSTEM (LMIS)',
      subtitle:
        'Submitted to: Infectious Diseases Institute (IDI), Makerere University',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 space-y-4">
              <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                <h3 className="text-xl font-semibold mb-2">Submitted by</h3>
                <p className="font-medium">Desishub Ltd.</p>
                <p>Kireka - Nakimbugwe Building</p>
                <p>(Opposite Police Station)</p>
                <p>Kampala, Uganda</p>
                <div className="mt-4 space-y-1">
                  <p>
                    <span className="font-medium">Phone:</span> +256 762 063 160
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{' '}
                    info@desishub.com
                  </p>
                  <p>
                    <span className="font-medium">Website:</span>{' '}
                    www.desishub.com
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="p-6 bg-gray-100 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">
                  Proposal Highlights
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Comprehensive LMIS tailored for CAP-accredited laboratory
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Seamless integration with existing IDI systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>6-month implementation with clear milestones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Comprehensive 12-month support & maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Developed by local experts with global standards
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-xl font-semibold mb-3">Executive Summary</h3>
            <p className="text-gray-700">
              Desishub Ltd. proposes a comprehensive Laboratory Management
              Information System (LMIS) for IDI's CAP-accredited laboratory. Our
              solution will enhance core laboratory operations through seamless
              integration, strict compliance with standards, user-centric
              design, robust security, real-time analytics, and a scalable
              architecture. Using agile methodology, we'll deliver a complete
              system within 6 months, followed by 12 months of support and
              maintenance.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Company Profile',
      subtitle: 'About Desishub',
      content: (
        <div className="space-y-6">
          <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-xl font-semibold mb-3">About Desishub</h3>
            <p className="text-gray-700">
              Founded in 2020, Desishub Ltd. is a Ugandan technology company
              dedicated to empowering businesses and institutions with
              innovative web and mobile solutions. We combine expert development
              with tech education to drive digital transformation across Uganda
              and beyond. Our headquarters are strategically located in Kireka,
              Kampala, with a team of hardworking full-time professionals
              specializing in healthcare informatics, software development, and
              systems integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-100 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-gray-700">
                To accelerate digital transformation across East Africa by
                creating intuitive, scalable, and impactful technology solutions
                while simultaneously building local technical capacity through
                education and knowledge transfer.
              </p>
            </div>

            <div className="p-6 bg-gray-100 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-3">Core Competencies</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Healthcare Information Systems Development</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Systems Integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Mobile Application Development</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Custom Software Solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Technology Education</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Understanding of Requirements',
      subtitle: 'Core Laboratory Context & Key Objectives',
      content: (
        <div className="space-y-6">
          <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-xl font-semibold mb-3">
              Core Laboratory Context
            </h3>
            <p className="text-gray-700">
              We understand that IDI's Core Laboratory is a College of American
              Pathologists (CAP)-accredited facility providing high-quality
              diagnostic services that advance research and patient care. The
              laboratory requires a robust LMIS that supports its accreditation
              status while enhancing operational efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Key Objectives</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-100 rounded-lg">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">
                      Improve Data Management & Traceability
                    </p>
                    <p className="text-sm text-gray-600">
                      Ensuring accurate capture, storage, and retrieval of
                      information
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-100 rounded-lg">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Enhance Workflow Efficiency</p>
                    <p className="text-sm text-gray-600">
                      Streamlining processes to minimize turnaround time
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-100 rounded-lg">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Ensure Regulatory Compliance</p>
                    <p className="text-sm text-gray-600">
                      Maintaining adherence to CAP, ISO, and other standards
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">More Objectives</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-100 rounded-lg">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Server className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Facilitate System Integration</p>
                    <p className="text-sm text-gray-600">
                      Connecting with existing health information systems
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-100 rounded-lg">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Enhance Data Security</p>
                    <p className="text-sm text-gray-600">
                      Implementing robust security measures and audit trails
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-100 rounded-lg">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Cog className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Support Scalability</p>
                    <p className="text-sm text-gray-600">
                      Building a system that can expand with IDI's operations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Proposed Solution',
      subtitle: 'LabFlow Pro: A Comprehensive LMIS',
      content: (
        <div className="space-y-6">
          <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-xl font-semibold mb-3">LMIS Overview</h3>
            <p className="text-gray-700">
              Desishub proposes to develop a comprehensive, web-based Laboratory
              Management Information System (LMIS) that will transform IDI's
              laboratory operations through digitization, automation, and
              integration. Our solution, which we've named LabFlow Pro, is built
              on modern, secure, and scalable technologies that ensure optimal
              performance in high-volume laboratory environments.
            </p>
          </div>

          <Tabs defaultValue="modules" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="modules">Key Modules</TabsTrigger>
              <TabsTrigger value="ui">User Interface</TabsTrigger>
              <TabsTrigger value="tech">Technical Differentiators</TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">
                      Patient & Sample Management
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Unique patient identification</li>
                      <li>• Sample accessioning with automatic ID</li>
                      <li>• Barcode generation and printing</li>
                      <li>• Sample tracking throughout workflow</li>
                      <li>• Batch processing capabilities</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">
                      Test Request & Workflow
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Test catalog management</li>
                      <li>• Rule-based test ordering</li>
                      <li>• Worklist generation</li>
                      <li>• Automated specimen routing</li>
                      <li>• Real-time status tracking</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Results Management</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Manual result entry with validation</li>
                      <li>• Direct instrument interface</li>
                      <li>• Delta checking and critical alerts</li>
                      <li>• Result verification workflow</li>
                      <li>• Electronic signature capability</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">
                      Quality Control & Assurance
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>• QC lot management and tracking</li>
                      <li>• Levy-Jennings charts</li>
                      <li>• Proficiency testing management</li>
                      <li>• Method validation documentation</li>
                      <li>• Non-conformance tracking</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ui" className="space-y-4">
              <div className="p-6 bg-gray-100 rounded-lg border border-gray-200">
                <h4 className="font-semibold mb-3">User Interface Design</h4>
                <p className="mb-4">
                  The LabFlow Pro interface is designed with laboratory
                  workflows in mind, incorporating:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Intuitive, role-based dashboards that present relevant
                      information based on user roles
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Color-coded status indicators for rapid visual assessment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Responsive design that works across desktop, tablet, and
                      mobile devices
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Accessibility features compliant with WCAG 2.1 guidelines
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Configurable workspaces that allow users to customize
                      their experience
                    </span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="tech" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Cog className="h-6 w-6 text-primary" />
                    <h4 className="font-semibold">Smart Workflow Engine</h4>
                  </div>
                  <p className="text-sm">
                    Our proprietary workflow engine adapts to laboratory
                    processes and can be configured without coding knowledge
                  </p>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Database className="h-6 w-6 text-primary" />
                    <h4 className="font-semibold">
                      Business Intelligence Layer
                    </h4>
                  </div>
                  <p className="text-sm">
                    In-built analytics that transform raw laboratory data into
                    actionable insights
                  </p>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Server className="h-6 w-6 text-primary" />
                    <h4 className="font-semibold">Offline Capability</h4>
                  </div>
                  <p className="text-sm">
                    Critical functions remain available during internet
                    disruptions with automatic synchronization
                  </p>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <h4 className="font-semibold">Automated Quality Checks</h4>
                  </div>
                  <p className="text-sm">
                    Built-in rules for identifying potential errors before they
                    impact patient care
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ),
    },
    {
      id: 5,
      title: 'Implementation Methodology',
      subtitle: 'Agile Development Approach',
      content: (
        <div className="space-y-6">
          <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-xl font-semibold mb-3">
              Agile Development Approach
            </h3>
            <p className="text-gray-700">
              Desishub employs a modified Agile methodology specifically adapted
              for healthcare informatics projects. This approach combines the
              flexibility of iterative development with the structure required
              for medical software development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Project Phases</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                      1
                    </span>
                    Discovery & Analysis
                    <span className="text-sm font-normal text-gray-500 ml-auto">
                      4 weeks
                    </span>
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Detailed requirements workshops</li>
                    <li>• Document current workflows</li>
                    <li>• Review existing systems</li>
                    <li>• System requirements specification</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                      2
                    </span>
                    Design & Prototyping
                    <span className="text-sm font-normal text-gray-500 ml-auto">
                      4 weeks
                    </span>
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Database schema and data dictionary</li>
                    <li>• UI/UX wireframes and prototypes</li>
                    <li>• Integration interfaces design</li>
                    <li>• Security architecture</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                      3
                    </span>
                    Iterative Development
                    <span className="text-sm font-normal text-gray-500 ml-auto">
                      12 weeks
                    </span>
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Implement core system modules</li>
                    <li>• Regular sprint reviews</li>
                    <li>• Continuous integration and testing</li>
                    <li>• Integration with existing systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Project Phases (cont.)</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                      4
                    </span>
                    Testing & Validation
                    <span className="text-sm font-normal text-gray-500 ml-auto">
                      4 weeks
                    </span>
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Comprehensive system testing</li>
                    <li>• User acceptance testing</li>
                    <li>• Security vulnerability assessment</li>
                    <li>• Data migration testing</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                      5
                    </span>
                    Deployment & Go-Live
                    <span className="text-sm font-normal text-gray-500 ml-auto">
                      2 weeks
                    </span>
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Final data migration</li>
                    <li>• User training and readiness</li>
                    <li>• Staged rollout</li>
                    <li>• Hypercare support</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                      6
                    </span>
                    Post-Implementation Support
                    <span className="text-sm font-normal text-gray-500 ml-auto">
                      Ongoing
                    </span>
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Transition to support model</li>
                    <li>• Regular system updates</li>
                    <li>• Performance monitoring</li>
                    <li>• Knowledge transfer to IDI IT team</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: 'System Architecture',
      subtitle: 'Technical Specifications',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
              <h3 className="text-xl font-semibold mb-3">
                System Architecture
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Presentation Layer</p>
                    <p className="text-sm text-gray-600">
                      Responsive web interface built with React.js
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Application Layer</p>
                    <p className="text-sm text-gray-600">
                      Node.js and Express for RESTful API services
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Data Layer</p>
                    <p className="text-sm text-gray-600">
                      PostgreSQL as primary database, MongoDB for unstructured
                      data
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mt-0.5">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Integration Layer</p>
                    <p className="text-sm text-gray-600">
                      RESTful APIs and custom connectors for legacy systems
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mt-0.5">
                    5
                  </div>
                  <div>
                    <p className="font-medium">Security Layer</p>
                    <p className="text-sm text-gray-600">
                      OAuth 2.0, RBAC, data encryption, audit logging
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-100 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-3">
                Technical Specifications
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Hardware Requirements</h4>
                  <ul className="mt-1 space-y-1 text-sm">
                    <li>
                      • Application Servers: 4+ core CPU, 16+ GB RAM, 100+ GB
                      storage
                    </li>
                    <li>
                      • Database Servers: 8+ core CPU, 32+ GB RAM, 500+ GB SSD
                      storage
                    </li>
                    <li>
                      • Client Requirements: Modern web browser, minimum 4 GB
                      RAM
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium">Software Stack</h4>
                  <ul className="mt-1 space-y-1 text-sm">
                    <li>• Frontend: Nextjs, Material-UI, Chart.js</li>
                    <li>• Backend: Node.js, Express, TypeScript</li>
                    <li>• Databases: PostgreSQL, MongoDB, Redis</li>
                    <li>• DevOps: Docker, Kubernetes, Jenkins</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium">Security Specifications</h4>
                  <ul className="mt-1 space-y-1 text-sm">
                    <li>• TLS 1.3 for all data transmission</li>
                    <li>• AES-256 encryption for data at rest</li>
                    <li>• Multi-factor authentication</li>
                    <li>• Regular automated vulnerability scanning</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3">Integration Approach</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Integration Points</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Electronic Medical Records (EMR) Integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Finance System Integration (Navision)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Laboratory Instrument Integration</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Integration Strategy</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Standards-Based Integration (HL7 FHIR, HL7v2)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>API-First Design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Bidirectional Data Flow</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      title: 'Previous Experience',
      subtitle: 'Relevant Projects',
      content: (
        <div className="space-y-6">
          <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-xl font-semibold mb-3">Relevant Projects</h3>
            <p className="text-gray-700">
              Desishub has successfully implemented several healthcare
              information systems similar to the proposed LMIS. Here are some
              key relevant projects that demonstrate our expertise and
              capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="overflow-hidden">
              <div className="bg-primary/10 p-4 border-b">
                <h3 className="font-semibold">
                  Hospital Website with Appointment Booking
                </h3>
                <p className="text-sm text-gray-600">
                  January 2024 – March 2024
                </p>
              </div>
              <CardContent className="p-4">
                <p className="text-sm mb-3">
                  Development and implementation of a nationwide laboratory
                  management system connecting central and regional
                  laboratories.
                </p>
                <h4 className="font-medium text-sm mb-2">Key Achievements:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Connected the hospital, pharmacy and the patients</li>
                  <li>• Reduced test turnaround time by 42%</li>
                  <li>• Implemented automated quality control monitoring</li>
                  <li>
                    • Medical department showcase with specialist profiles
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-primary/10 p-4 border-b">
                <h3 className="font-semibold">
                  Multi-School Management System with Custom CMS
                </h3>
                <p className="text-sm text-gray-600">
                  March 2023 - November 2023
                </p>
              </div>
              <CardContent className="p-4">
                <p className="text-sm mb-3">
                  A powerful Node.js school management platform supporting
                  multiple institutions with a custom CMS, comprehensive
                  administrative tools, and attendance tracking.
                </p>
                <h4 className="font-medium text-sm mb-2">Key Achievements:</h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    • Medical department showcase with specialist profiles
                  </li>
                  <li>• Student management system with detailed profiles</li>
                  <li>• Communication tools for staff, parents and students</li>
                  <li>• Finance tracking and reporting capabilities</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="overflow-hidden">
              <div className="bg-primary/10 p-4 border-b">
                <h3 className="font-semibold">Medical Application</h3>
                <p className="text-sm text-gray-600">
                  January 2024 – March 2024
                </p>
              </div>
              <CardContent className="p-4">
                <p className="text-sm mb-3">
                  A powerfull Development and implementation of a medical
                  application system connecting central and regional hospitals.
                </p>
                <h4 className="font-medium text-sm mb-2">Key Achievements:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Connected the hospital, pharmacy and the patients</li>
                  <li>• Reduced test turnaround time by 42%</li>
                  <li>• Implemented automated quality control monitoring</li>
                  <li>
                    • Medical department showcase with specialist profiles
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-primary/10 p-4 border-b">
                <h3 className="font-semibold">
                  Logistics Shipment Tracking System
                </h3>
                <p className="text-sm text-gray-600">August 2022 - June 2022</p>
              </div>
              <CardContent className="p-4">
                <p className="text-sm mb-3">
                  A logistics application for creating, managing, and tracking
                  shipments with automated receipt generation and detailed
                  status updates.
                </p>
                <h4 className="font-medium text-sm mb-2">Key Achievements:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Detailed tracking history with timestamps</li>
                  <li>• Customer management database</li>
                  <li>• Package type and specifications tracking</li>
                  <li>• Real-time status updates and notifications</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-primary/10 p-4 border-b">
                <h3 className="font-semibold">
                  Bulk SMS & Email Marketing Tool
                </h3>
                <p className="text-sm text-gray-600">
                  January 2020 - September 2020
                </p>
              </div>
              <CardContent className="p-4">
                <p className="text-sm mb-3">
                  A comprehensive marketing communication system for managing
                  contacts, sending bulk SMS and email campaigns, and tracking
                  marketing performance.
                </p>
                <h4 className="font-medium text-sm mb-2">Key Achievements:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Unified dashboard for SMS and email campaigns</li>
                  <li>• Multiple SMS types (single, multiple, group)</li>
                  <li>• Bulk email campaign management</li>
                  <li>• Contact organization with custom groups</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: 8,
      title: 'Project Timeline & Milestones',
      subtitle: '24-Week Implementation Plan',
      content: (
        <div className="space-y-6">
          <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-xl font-semibold mb-3">Overall Timeline</h3>
            <p className="text-gray-700 mb-4">
              Desishub proposes a 24-week (6-month) implementation timeline for
              the complete LMIS solution, with clear milestones and
              deliverables.
            </p>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <div className="w-full sm:w-1/4 font-medium">
                  Discovery & Analysis
                </div>
                <div className="w-full sm:w-1/4 text-sm">4 weeks</div>
                <div className="w-full sm:w-2/4 text-sm">
                  May 15, 2025 - June 11, 2025
                </div>
              </div>
              <Progress value={16.7} className="h-2" />

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <div className="w-full sm:w-1/4 font-medium">
                  Design & Prototyping
                </div>
                <div className="w-full sm:w-1/4 text-sm">4 weeks</div>
                <div className="w-full sm:w-2/4 text-sm">
                  June 12, 2025 - July 9, 2025
                </div>
              </div>
              <Progress value={33.3} className="h-2" />

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <div className="w-full sm:w-1/4 font-medium">
                  Iterative Development
                </div>
                <div className="w-full sm:w-1/4 text-sm">12 weeks</div>
                <div className="w-full sm:w-2/4 text-sm">
                  July 10, 2025 - October 1, 2025
                </div>
              </div>
              <Progress value={83.3} className="h-2" />

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <div className="w-full sm:w-1/4 font-medium">
                  Testing & Validation
                </div>
                <div className="w-full sm:w-1/4 text-sm">4 weeks</div>
                <div className="w-full sm:w-2/4 text-sm">
                  October 2, 2025 - October 29, 2025
                </div>
              </div>
              <Progress value={91.7} className="h-2" />

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <div className="w-full sm:w-1/4 font-medium">
                  Deployment & Go-Live
                </div>
                <div className="w-full sm:w-1/4 text-sm">2 weeks</div>
                <div className="w-full sm:w-2/4 text-sm">
                  October 30, 2025 - November 12, 2025
                </div>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Key Milestones</h3>
              <div className="space-y-3">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                        1
                      </span>
                      Project Initiation (Week 1)
                    </h4>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Project kickoff meeting conducted</li>
                      <li>• Project team established and roles assigned</li>
                      <li>• Project plan finalized and approved</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                        2
                      </span>
                      Requirements & Analysis Complete (Week 4)
                    </h4>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Detailed requirements specification document</li>
                      <li>• Current state assessment report</li>
                      <li>
                        • Process flow diagrams for all laboratory workflows
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                        3
                      </span>
                      Design Approval (Week 8)
                    </h4>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Database schema and data dictionary</li>
                      <li>• UI/UX design mockups approved</li>
                      <li>• API specifications and integration designs</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Key Milestones (cont.)</h3>
              <div className="space-y-3">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                        4
                      </span>
                      Core Modules Development (Week 14)
                    </h4>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Sample management module complete</li>
                      <li>• Test request and workflow module complete</li>
                      <li>
                        • User management and security features implemented
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                        5
                      </span>
                      Complete System Development (Week 20)
                    </h4>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• All system modules developed and integrated</li>
                      <li>• Full system integration testing complete</li>
                      <li>• User acceptance testing begun</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                        6
                      </span>
                      System Deployment (Week 24)
                    </h4>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• System deployed to production environment</li>
                      <li>• Data migration complete and verified</li>
                      <li>• User training completed</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 9,
      title: 'Financial Proposal',
      subtitle: 'Pricing Model & Payment Schedule',
      content: (
        <div className="space-y-6">
          <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-xl font-semibold mb-3">Pricing Model</h3>
            <p className="text-gray-700 mb-4">
              Desishub proposes a transparent and value-based pricing model for
              the LMIS implementation, with clearly defined payment milestones.
            </p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Phase</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Price (UGX)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Phase 1</TableCell>
                  <TableCell>Discovery & Analysis</TableCell>
                  <TableCell className="text-right">2,000,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phase 2</TableCell>
                  <TableCell>Design & Prototyping</TableCell>
                  <TableCell className="text-right">4,000,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phase 3</TableCell>
                  <TableCell>Iterative Development</TableCell>
                  <TableCell className="text-right">6,000,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phase 4</TableCell>
                  <TableCell>Testing & Validation</TableCell>
                  <TableCell className="text-right">1,500,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phase 5</TableCell>
                  <TableCell>Deployment & Go-Live</TableCell>
                  <TableCell className="text-right">1,000,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phase 6</TableCell>
                  <TableCell>Hypercare Support (4 weeks)</TableCell>
                  <TableCell className="text-right">4,000,000</TableCell>
                </TableRow>
                <TableRow className="font-medium">
                  <TableCell>Total Implementation Cost</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right">18,500,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Additional Costs</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Price (UGX)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      Annual Support & Maintenance (12 months)
                    </TableCell>
                    <TableCell className="text-right">6,000,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>User License (per additional user)</TableCell>
                    <TableCell className="text-right">1,000,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Additional Customization (per developer day)
                    </TableCell>
                    <TableCell className="text-right">700,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Additional Training (per session)</TableCell>
                    <TableCell className="text-right">1,000,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Payment Schedule</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Milestone</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead className="text-right">Amount (UGX)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Contract Signing</TableCell>
                    <TableCell>20%</TableCell>
                    <TableCell className="text-right">3,700,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Completion of Requirements & Design</TableCell>
                    <TableCell>15%</TableCell>
                    <TableCell className="text-right">2,775,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Completion of Core Modules</TableCell>
                    <TableCell>25%</TableCell>
                    <TableCell className="text-right">4,625,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>System Testing & UAT</TableCell>
                    <TableCell>20%</TableCell>
                    <TableCell className="text-right">3,700,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>System Go-Live</TableCell>
                    <TableCell>15%</TableCell>
                    <TableCell className="text-right">2,775,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Final Acceptance (30 days post-go-live)
                    </TableCell>
                    <TableCell>5%</TableCell>
                    <TableCell className="text-right">925,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 10,
      title: 'Training & Support',
      subtitle: 'Knowledge Transfer & Maintenance',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
              <h3 className="text-xl font-semibold mb-3">Training Approach</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">
                    Role-Based Training Modules
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      • Laboratory Technicians: Sample processing, testing, and
                      reporting workflows
                    </li>
                    <li>
                      • Laboratory Management: Administrative functions, quality
                      control, and analytics
                    </li>
                    <li>
                      • IT Staff: System administration, configuration, and
                      basic troubleshooting
                    </li>
                    <li>
                      • Data Entry Staff: Patient registration, order entry, and
                      basic operations
                    </li>
                    <li>
                      • Finance Personnel: Billing and invoicing management
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Training Methods</h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      • Instructor-Led Training: Hands-on sessions conducted by
                      experienced trainers
                    </li>
                    <li>
                      • Computer-Based Training: Self-paced modules with
                      interactive exercises
                    </li>
                    <li>
                      • Simulation Training: Practice scenarios in a test
                      environment
                    </li>
                    <li>
                      • Peer Training: Train-the-trainer approach for
                      sustainable knowledge transfer
                    </li>
                    <li>
                      • On-the-Job Support: Side-by-side assistance during
                      initial implementation
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-100 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-3">Support Model</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">Tiered Support Structure</h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      • Tier 1: First-line support for general inquiries and
                      basic troubleshooting
                    </li>
                    <li>
                      • Tier 2: Technical support for complex issues requiring
                      system expertise
                    </li>
                    <li>
                      • Tier 3: Advanced support involving core system
                      modifications or external vendors
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Support Channels</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• 24/7 email support system</li>
                    <li>
                      • Dedicated support hotline during business hours (8 AM -
                      5 PM EAT, Monday-Friday)
                    </li>
                    <li>
                      • Emergency contact for critical issues outside business
                      hours
                    </li>
                    <li>• Online ticketing system with issue tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Issue Severity</TableHead>
                  <TableHead>Definition</TableHead>
                  <TableHead>Response Time</TableHead>
                  <TableHead>Resolution Target</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Critical</TableCell>
                  <TableCell>
                    System unavailable or major function unusable
                  </TableCell>
                  <TableCell>30 minutes</TableCell>
                  <TableCell>4 hours</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">High</TableCell>
                  <TableCell>
                    Significant impact to operations, workaround available
                  </TableCell>
                  <TableCell>2 hours</TableCell>
                  <TableCell>8 hours</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Medium</TableCell>
                  <TableCell>Limited impact, operations can continue</TableCell>
                  <TableCell>8 hours</TableCell>
                  <TableCell>3 business days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Low</TableCell>
                  <TableCell>Minor issues, no operational impact</TableCell>
                  <TableCell>24 hours</TableCell>
                  <TableCell>5 business days</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3">Maintenance Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Preventive Maintenance</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Weekly system health checks</li>
                  <li>• Monthly performance optimization</li>
                  <li>• Quarterly security assessments</li>
                  <li>• Semi-annual comprehensive system review</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Corrective Maintenance</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Bug fixes and issue resolution</li>
                  <li>• Error monitoring and proactive correction</li>
                  <li>• System recovery in case of failures</li>
                  <li>• Data integrity verification and correction</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 11,
      title: 'Conclusion',
      subtitle: 'Why Choose Desishub',
      content: (
        <div className="space-y-6">
          <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-xl font-semibold mb-3">Key Differentiators</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary text-white p-2 rounded-full mt-0.5">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">
                    Local Expertise with Global Standards
                  </p>
                  <p className="text-sm text-gray-600">
                    A Uganda-based team with international certification and
                    healthcare informatics expertise
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary text-white p-2 rounded-full mt-0.5">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Proven Track Record</p>
                  <p className="text-sm text-gray-600">
                    Successful implementation of similar systems for major
                    healthcare institutions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary text-white p-2 rounded-full mt-0.5">
                  <Code className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Comprehensive Solution</p>
                  <p className="text-sm text-gray-600">
                    A complete approach covering all aspects from development to
                    training, support, and continuous improvement
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary text-white p-2 rounded-full mt-0.5">
                  <ExternalLink className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Long-Term Partnership</p>
                  <p className="text-sm text-gray-600">
                    Commitment to IDI's success beyond just software delivery,
                    with ongoing support and strategic guidance
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3">Value Proposition</h3>
            <p className="text-gray-700 mb-4">
              By selecting Desishub for this critical project, IDI will benefit
              from:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Improved Laboratory Efficiency: Streamlined workflows, reduced
                  manual processes, and decreased turnaround times
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Enhanced Data Quality: Reduced errors, comprehensive
                  validation, and improved traceability
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Better Decision Support: Real-time analytics and dashboards
                  for informed operational decisions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Regulatory Compliance: Maintained CAP accreditation with
                  comprehensive documentation and quality controls
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Future-Ready Platform: Scalable architecture ready to grow
                  with IDI's evolving needs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Local Support: Responsive, Uganda-based team available for
                  in-person assistance when needed
                </span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-xl font-semibold mb-3">Next Steps</h3>
            <p className="text-gray-700 mb-4">
              We welcome the opportunity to discuss our proposal in more detail
              and demonstrate our capabilities. Our team is available for:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mt-0.5">
                  1
                </div>
                <span>In-person presentation of our proposed solution</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mt-0.5">
                  2
                </div>
                <span>
                  Demonstration of similar systems implemented for other clients
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mt-0.5">
                  3
                </div>
                <span>
                  Discussion of specific technical requirements and
                  implementation approach
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mt-0.5">
                  4
                </div>
                <span>
                  Refinement of project scope and timelines based on your
                  feedback
                </span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg border border-gray-200">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="text-center md:text-left">
                <p className="font-medium">Submitted by:</p>
                <p className="text-xl font-bold mt-2">Muke Johnbaptist(JB)</p>
                <p>Director & CEO</p>
                <p>Desishub Ltd.</p>
                <p className="mt-2">Date: May 2, 2025</p>
              </div>

              <div className="md:ml-auto text-center md:text-right">
                <p className="font-medium">Contact Information:</p>
                <p>Desishub Ltd.</p>
                <p>Kireka - Nakimbugwe Building</p>
                <p>(Opposite Police Station)</p>
                <p>Kampala, Uganda</p>
                <p className="mt-2">Phone: +256 762 063 160</p>
                <p>Email: info@desishub.com</p>
                <p>Website: www.desishub.com</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-12">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-500">
                {currentSlide + 1} / {slides.length}
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full flex-1 mx-4">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentSlide + 1) / slides.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-primary">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            <div className="min-h-[400px] md:min-h-[500px]">
              {slides[currentSlide].content}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full h-12 w-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full bg-secondary h-12 w-12"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
