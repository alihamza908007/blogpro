import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function About() {
  return (
    <Card className="py-30 text-center w-full max-w-xl mx-auto">
      <CardHeader>ABOUT US :</CardHeader>
      <CardContent>
        Welcome to my little corner of the internet! This blog is a space where
        I share new ideas, thoughts, and stories inspired by everyday life. It’s
        all about exploring the world through different experiences — from the
        food we taste to the places we travel, and the lessons we learn along
        the way. Here, you’ll find posts about: Fresh ideas and personal
        thoughts Delicious food discoveries and recipes Holidays, tourism, and
        travel adventures Education, learning, and self-growth Life experiences
        and inspiring moments This blog is not limited to just one theme — it’s
        a mix of everything that makes life interesting. Whether you’re here for
        travel inspiration, food cravings, meaningful reflections, or simply
        something new to read, I hope you’ll find something that connects with
        you. Thank you for visiting, and feel free to join this journey of
        sharing, learning, and discovering together!
      </CardContent>
      <CardFooter>
        <p>Thanks for reading!</p>
      </CardFooter>
    </Card>
  );
}
