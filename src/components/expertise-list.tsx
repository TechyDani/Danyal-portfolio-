import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { expertise } from "@/lib/content";

export function ExpertiseList({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="expertise-list">
      {expertise.map((item, index) => (
        <details
          className="expertise-item"
          key={item.title}
          open={index === 0 ? true : undefined}
        >
          <summary>
            <span className="expertise-number">0{index + 1}</span>
            <h3>{item.title}</h3>
            <span className="expertise-toggle">
              <Plus size={20} />
            </span>
          </summary>
          <div className="expertise-body">
            <p>{item.description}</p>
            <div className="deliverable-tags">
              {item.deliverables.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            {detailed && (
              <Link
                href={`/work?category=${encodeURIComponent(item.category)}`}
                className="text-link"
              >
                Explore related work
                <ArrowUpRight size={16} />
              </Link>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
