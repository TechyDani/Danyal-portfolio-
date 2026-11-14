"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useState } from "react";
import { socialPosts } from "@/lib/social-posts";

export function SocialPostGallery() {
  const [paused, setPaused] = useState(false);
  const rows = [socialPosts.slice(0, 9), socialPosts.slice(9, 18)];

  return (
    <section
      className="social-gallery"
      aria-label="Social media design gallery"
      data-paused={paused}
    >
      <div className="social-gallery-heading container">
        <p>Social media / Selected designs</p>
        <button
          type="button"
          className="social-motion-toggle"
          aria-pressed={paused}
          aria-label="Pause gallery motion"
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}
          {paused ? "Resume motion" : "Pause motion"}
        </button>
      </div>
      <div className="social-gallery-rows">
        {rows.map((posts, row) => (
          <div className="social-gallery-row" key={row}>
            <div
              className={`social-gallery-track ${row === 0 ? "social-track-right" : "social-track-left"}`}
            >
              {[0, 1].map((copy) => (
                <div
                  className="social-gallery-group"
                  key={copy}
                  aria-hidden={copy === 1 ? true : undefined}
                >
                  {posts.map((post) => (
                    <div
                      className="social-post-card"
                      key={post.src}
                      style={{ aspectRatio: `${post.width} / ${post.height}` }}
                    >
                      <Image
                        src={post.src}
                        alt={copy === 0 ? post.alt : ""}
                        fill
                        sizes="(max-width: 760px) 160px, 240px"
                        className="social-post-image"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
