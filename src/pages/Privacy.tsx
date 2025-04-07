
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Lock, Shield, Eye, UserCheck } from "lucide-react";

const Privacy = () => {
  return (
    <div className="container py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">
            Last updated: April 7, 2025
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Welcome to XO Online. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
            <p>
              This policy applies to all users of our platform. Please read it carefully to understand our practices regarding your personal data.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="mr-2 h-5 w-5 text-primary" />
              Data We Collect
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Identity Data</strong> - includes username, email address</li>
              <li><strong>Profile Data</strong> - includes your game statistics, points, rank, and game history</li>
              <li><strong>Technical Data</strong> - includes IP address, browser type and version, time zone setting and location, operating system and platform</li>
              <li><strong>Usage Data</strong> - includes information about how you use our website and services</li>
            </ul>
            <p>
              We do not collect any Special Categories of Personal Data about you (this includes details about your race, ethnicity, religious or philosophical beliefs, sexual orientation, etc.).
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              How We Use Your Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>To create and manage your account</li>
              <li>To provide our services (game features, rankings, etc.)</li>
              <li>To track game statistics and update your profile accordingly</li>
              <li>To improve our website and services</li>
              <li>To communicate with you about your account or our services</li>
              <li>To protect our services from fraud and abuse</li>
            </ul>
            <p>
              We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="mr-2 h-5 w-5 text-primary" />
              Data Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
            </p>
            <p className="mb-4">
              We use industry-standard encryption and secure server technology to protect your information. We also limit access to your personal data to employees and third parties who have a business need to know.
            </p>
            <p>
              We have procedures in place to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="mr-2 h-5 w-5 text-primary" />
              Your Rights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data. These include the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>
            <p className="mb-4">
              You can exercise any of these rights by contacting us at privacy@xoonline.com.
            </p>
            <p>
              You will not have to pay a fee to access your personal data or to exercise any of the other rights. However, we may charge a reasonable fee if your request is clearly unfounded, repetitive or excessive.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
