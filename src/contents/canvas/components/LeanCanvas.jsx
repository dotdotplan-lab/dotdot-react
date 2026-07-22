import CanvasCard from './CanvasCard.jsx';
import { CANVAS_SECTION } from '../../../constants/canvasSection.js';

function LeanCanvas({ canvas, canvasId }) {
  const getNotes = (sectionType) => canvas.notes?.filter((note) => note.sectionType === sectionType) ?? [];

  return (
    <div className="border-4 border-black">
      <div className="grid grid-cols-5">

          <CanvasCard
              canvasId={canvasId}
              sectionType={CANVAS_SECTION.PROBLEM}
              title="1. 문제"
              notes={getNotes(CANVAS_SECTION.PROBLEM)}
          />

          <CanvasCard
              canvasId={canvasId}
              sectionType={CANVAS_SECTION.SOLUTION}
              title="4. 해결안"
              notes={getNotes(CANVAS_SECTION.SOLUTION)}
          />

          <CanvasCard
              canvasId={canvasId}
              sectionType={CANVAS_SECTION.VALUE_PROPOSITION}
              title="3. 가치제안"
              notes={getNotes(CANVAS_SECTION.VALUE_PROPOSITION)}
          />

          <CanvasCard
              canvasId={canvasId}
              sectionType={CANVAS_SECTION.UNFAIR_ADVANTAGE}
              title="5. 경쟁우위"
              notes={getNotes(CANVAS_SECTION.UNFAIR_ADVANTAGE)}
          />

          <CanvasCard
              canvasId={canvasId}
              sectionType={CANVAS_SECTION.CUSTOMER_SEGMENTS}
              title="2. 목표 고객"
              notes={getNotes(CANVAS_SECTION.CUSTOMER_SEGMENTS)}
          />

          <CanvasCard
              canvasId={canvasId}
              sectionType={CANVAS_SECTION.EXISTING_ALTERNATIVES}
              title="기존 대안"
              isSubTitle
              notes={getNotes(CANVAS_SECTION.EXISTING_ALTERNATIVES)}
          />

          <CanvasCard
              canvasId={canvasId}
              sectionType={CANVAS_SECTION.KEY_METRICS}
              title="8. 핵심지표"
              notes={getNotes(CANVAS_SECTION.KEY_METRICS)}
          />

          <CanvasCard
              canvasId={canvasId}
              sectionType={CANVAS_SECTION.HIGH_LEVEL_CONCEPT}
              title="상위개념"
              isSubTitle
              notes={getNotes(CANVAS_SECTION.HIGH_LEVEL_CONCEPT)}
          />

          <CanvasCard
              canvasId={canvasId}
              sectionType={CANVAS_SECTION.CHANNELS}
              title="9. 고객 경로"
              notes={getNotes(CANVAS_SECTION.CHANNELS)}
          />

          <CanvasCard
              canvasId={canvasId}
              sectionType={CANVAS_SECTION.EARLY_ADOPTERS}
              title="얼리 어답터"
              isSubTitle
              notes={getNotes(CANVAS_SECTION.EARLY_ADOPTERS)}
          />
      </div>

        <div className="grid grid-cols-2">
            <CanvasCard
                canvasId={canvasId}
                sectionType={CANVAS_SECTION.COST_STRUCTURE}
                title="7. 비용 구조"
                notes={getNotes(CANVAS_SECTION.COST_STRUCTURE)}
            />

            <CanvasCard
                canvasId={canvasId}
                sectionType={CANVAS_SECTION.REVENUE_STREAMS}
                title="6. 수익 흐름"
                notes={getNotes(CANVAS_SECTION.REVENUE_STREAMS)}
            />
        </div>
    </div>
  );
}

export default LeanCanvas;
