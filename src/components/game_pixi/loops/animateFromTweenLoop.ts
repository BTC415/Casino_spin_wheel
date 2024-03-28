import { allTweenings } from "../../../config";
import { lerp } from "../../../utils/utils";
export function animateAllTweenings() {
  const now = Date.now();
  const remove = [];
  for (let i = 0; i < allTweenings.length; i++) {
    const t = allTweenings[i];
    const phase = Math.min(1, (now - t.start) / t.time);
    (t.object as any)[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
    if (t.change) t.change(t);
    if (phase === 1) {
      (t.object as any)[t.property] = t.target;

      setTimeout(() => {
        if (t.complete) {
          t.complete(t)
        }
      }, 100);
      remove.push(t);
    }
  }
  for (let i = 0; i < remove.length; i++) {
    allTweenings.splice(allTweenings.indexOf(remove[i]), 1);
  }
};
