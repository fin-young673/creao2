import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useDataStore } from "@/contexts/DataStoreContext";

export const Route = createFileRoute("/blog/$slug")({
	component: BlogPostPage,
});

function BlogPostPage() {
	const { slug } = Route.useParams();
	const navigate = useNavigate();
	const { blogPosts } = useDataStore();
	const post = blogPosts.find((p) => p.slug === slug);

	if (!post) {
		return (
			<div className="max-w-4xl mx-auto text-center space-y-6 py-12">
				<h1 className="text-3xl font-bold">Post Not Found</h1>
				<p className="text-muted-foreground">
					The blog post you're looking for doesn't exist.
				</p>
				<Link to="/blog">
					<Button>
						<ArrowLeft className="size-4 mr-2" />
						Back to Blog
					</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto space-y-8">
			{/* Back Button */}
			<Button variant="ghost" onClick={() => navigate({ to: "/blog" })}>
				<ArrowLeft className="size-4 mr-2" />
				Back to Blog
			</Button>

			{/* Hero Image */}
			{post.imageUrl && (
				<div className="aspect-video w-full overflow-hidden rounded-lg border">
					<img
						src={post.imageUrl}
						alt={post.title}
						className="w-full h-full object-cover"
					/>
				</div>
			)}

			{/* Article Header */}
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<Badge variant="secondary">{post.category}</Badge>
				</div>
				<h1 className="text-4xl font-bold">{post.title}</h1>
				<div className="flex items-center gap-4 text-sm text-muted-foreground">
					<div className="flex items-center gap-1">
						<Calendar className="size-4" />
						{new Date(post.publishedDate).toLocaleDateString("en-GB", {
							day: "numeric",
							month: "long",
							year: "numeric",
						})}
					</div>
					<div className="flex items-center gap-1">
						<Clock className="size-4" />
						{post.readingTime} min read
					</div>
				</div>
			</div>

			<Separator />

			{/* Article Content */}
			<Card>
				<CardContent className="pt-6 prose prose-sm max-w-none dark:prose-invert">
					<div
						dangerouslySetInnerHTML={{
							__html: post.content
								.split("\n")
								.map((line) => {
									// Convert markdown headings to HTML
									if (line.startsWith("### ")) {
										return `<h3>${line.substring(4)}</h3>`;
									}
									if (line.startsWith("## ")) {
										return `<h2>${line.substring(3)}</h2>`;
									}
									if (line.startsWith("# ")) {
										return `<h1>${line.substring(2)}</h1>`;
									}
									// Convert markdown lists
									if (line.startsWith("- ")) {
										return `<li>${line.substring(2)}</li>`;
									}
									// Convert bold
									const boldConverted = line.replace(
										/\*\*(.*?)\*\*/g,
										"<strong>$1</strong>"
									);
									// Convert links
									const linkConverted = boldConverted.replace(
										/\[(.*?)\]\((.*?)\)/g,
										'<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
									);
									// Empty lines become breaks
									if (line.trim() === "") {
										return "<br />";
									}
									// Regular paragraphs
									return `<p>${linkConverted}</p>`;
								})
								.join(""),
						}}
					/>
				</CardContent>
			</Card>

			<Separator />

			{/* Related Posts */}
			<div>
				<h2 className="text-2xl font-bold mb-6">More from the Blog</h2>
				<div className="grid md:grid-cols-2 gap-6">
					{blogPosts.filter((p) => p.id !== post.id)
						.slice(0, 2)
						.map((relatedPost) => (
							<Card key={relatedPost.id}>
								{relatedPost.imageUrl && (
									<div className="aspect-video w-full overflow-hidden rounded-t-lg">
										<img
											src={relatedPost.imageUrl}
											alt={relatedPost.title}
											className="w-full h-full object-cover"
										/>
									</div>
								)}
								<CardHeader>
									<Badge variant="secondary" className="w-fit mb-2">
										{relatedPost.category}
									</Badge>
									<CardTitle className="line-clamp-2">{relatedPost.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground line-clamp-2 mb-4">
										{relatedPost.excerpt}
									</p>
									<Link to="/blog/$slug" params={{ slug: relatedPost.slug }}>
										<Button variant="outline" size="sm">
											Read More
										</Button>
									</Link>
								</CardContent>
							</Card>
						))}
				</div>
			</div>

			{/* CTA */}
			<Card className="bg-primary/5 border-primary/20 text-center">
				<CardContent className="pt-6">
					<h3 className="text-xl font-bold mb-2">Join Our Transparent Community</h3>
					<p className="text-muted-foreground mb-4">
						Start your giving journey and see your impact in our quarterly reports.
					</p>
					<Link to="/signup">
						<Button size="lg">Start a Plan</Button>
					</Link>
				</CardContent>
			</Card>
		</div>
	);
}
