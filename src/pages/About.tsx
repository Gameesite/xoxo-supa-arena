
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Users, Code, Medal, Sparkle } from "lucide-react";

const About = () => {
  return (
    <div className="container py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            About <span className="text-primary">XO</span> <span className="text-secondary">Online</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Learn more about our gaming platform and what makes us special
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="mr-2 h-5 w-5 text-primary" />
              Our Story
            </CardTitle>
            <CardDescription>How it all began</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              XO Online was created with a simple mission: to bring the classic game of Tic-Tac-Toe to the digital world with competitive features and a community-focused approach.
            </p>
            <p>
              What started as a small project quickly grew into a platform where players from around the world can challenge each other, track their progress, and compete for the top spots on our leaderboards.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Our Community
            </CardTitle>
            <CardDescription>Players from around the globe</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Our community is at the heart of everything we do. We've built XO Online to be a place where players can not only enjoy the game but also connect with others who share their passion.
            </p>
            <p>
              From casual players to competitive strategists, our platform welcomes everyone regardless of skill level. We're constantly working to improve the experience based on feedback from our amazing community.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="mr-2 h-5 w-5 text-primary" />
              Our Technology
            </CardTitle>
            <CardDescription>Built with modern tools</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              XO Online is built using cutting-edge web technologies, including React for the front-end interface and Supabase for backend functionality including authentication and real-time data updates.
            </p>
            <p>
              Our development team is constantly working to enhance the platform with new features, better performance, and an improved user experience.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Medal className="mr-2 h-5 w-5 text-primary" />
              Our Vision
            </CardTitle>
            <CardDescription>What we're working towards</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Our vision is to create the most enjoyable and engaging online Tic-Tac-Toe experience available. We want to transform a simple game into a platform for meaningful competition and community building.
            </p>
            <p>
              In the future, we plan to expand our offerings with tournaments, enhanced multiplayer features, and more ways for players to customize their experience and show off their achievements.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkle className="mr-2 h-5 w-5 text-primary" />
              Join Us
            </CardTitle>
            <CardDescription>Become part of our community</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              We invite you to join our growing community of players. Whether you're looking to casually enjoy a few games, compete against friends, or rise to the top of our leaderboards, there's a place for you at XO Online.
            </p>
            <p>
              Create an account today to start your journey and be part of something special. We can't wait to see you on the leaderboards!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
