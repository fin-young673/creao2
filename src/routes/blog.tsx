import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BLOG_POSTS } from "@/lib/mock-data";

export const Route = createFileRoute("/blog")({
	component: BlogPage,
});

function BlogPage() {
	return (
		<div className="max-w-4xl mx-auto space-y-12">
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-4">Blog</h1>
				<p className="text-xl text-muted-foreground">
					Updates, partner stories, and transparency reports
				</p>
			</div>

			<Tabs defaultValue="all">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="all">All Posts</TabsTrigger>
					<TabsTrigger value="transparency">Transparency</TabsTrigger>
					<TabsTrigger value="partner-stories">Partners</TabsTrigger>
					<TabsTrigger value="updates">Updates</TabsTrigger>
				</TabsList>

				<TabsContent value="all" className="space-y-6 mt-6">
					{BLOG_POSTS.map((post) => (
						<Card key={post.id}>
							<CardHeader>
								<div className="flex items-start justify-between">
									<div className="space-y-1">
										<Badge variant="secondary" className="mb-2">
											{post.category}
										</Badge>
										<CardTitle>{post.title}</CardTitle>
										<CardDescription>
											{new Date(post.publishedDate).toLocaleDateString("en-GB", {
												day: "numeric",
												month: "long",
												year: "numeric",
											})}{" "}
											&bull; {post.readingTime} min read
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">{post.excerpt}</p>
							</CardContent>
							<CardFooter>
								<Button variant="outline">Read More</Button>
							</CardFooter>
						</Card>
					))}
				</TabsContent>

				{["transparency", "partner-stories", "updates"].map((category) => (
					<TabsContent key={category} value={category} className="space-y-6 mt-6">
						{BLOG_POSTS.filter((p) => p.category === category).map((post) => (
							<Card key={post.id}>
								<CardHeader>
									<CardTitle>{post.title}</CardTitle>
									<CardDescription>
										{new Date(post.publishedDate).toLocaleDateString("en-GB")} &bull;{" "}
										{post.readingTime} min read
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground">{post.excerpt}</p>
								</CardContent>
							</Card>
						))}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
