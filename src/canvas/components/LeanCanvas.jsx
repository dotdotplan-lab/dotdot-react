import CanvasCard from './CanvasCard.jsx';
import { CANVAS_SECTION } from '../../shared/constants/canvasSection';

function LeanCanvas({ canvas, onCanvasChange }) {
  const getNotes = (sectionType) => canvas.notes?.filter((note) => note.sectionType === sectionType) ?? [];

  const handleNotesChange = (sectionType, updatedNotes) => {
    const others = canvas.notes?.filter((note) => note.sectionType !== sectionType) ?? [];
    const newNotes = updatedNotes.map((note) => ({
      ...note, sectionType,
    }));

    onCanvasChange({
      ...canvas,
      notes: [...others, ...newNotes ],
    });
  };

  return (
    <div className="border-4 border-black">
      <div className="grid grid-cols-5">
        <CanvasCard
            title="1. 문제"
            notes={getNotes(CANVAS_SECTION.PROBLEM)}
            onNotesChange={(notes) =>
                handleNotesChange(CANVAS_SECTION.PROBLEM, notes)
            }
        />

        <CanvasCard
            title="4. 해결안"
            notes={getNotes(CANVAS_SECTION.SOLUTION)}
            onNotesChange={(notes) =>
                handleNotesChange(CANVAS_SECTION.SOLUTION, notes)
            }
        />

        <CanvasCard
            title="3. 가치제안"
            notes={getNotes(CANVAS_SECTION.VALUE_PROPOSITION)}
            onNotesChange={(notes) =>
                handleNotesChange(CANVAS_SECTION.VALUE_PROPOSITION, notes)
            }
        />

        <CanvasCard
            title="5. 경쟁우위"
            notes={getNotes(CANVAS_SECTION.UNFAIR_ADVANTAGE)}
            onNotesChange={(notes) =>
                handleNotesChange(CANVAS_SECTION.UNFAIR_ADVANTAGE, notes)
            }
        />

        <CanvasCard
            title="2. 목표 고객"
            notes={getNotes(CANVAS_SECTION.CUSTOMER_SEGMENTS)}
            onNotesChange={(notes) =>
                handleNotesChange(CANVAS_SECTION.CUSTOMER_SEGMENTS, notes)
            }
        />

        <CanvasCard
            title="기존 대안"
            isSubTitle
            notes={getNotes(CANVAS_SECTION.EXISTING_ALTERNATIVES)}
            onNotesChange={(notes) =>
                handleNotesChange(CANVAS_SECTION.EXISTING_ALTERNATIVES, notes)
            }
        />

        <CanvasCard
            title="8. 핵심지표"
            notes={getNotes(CANVAS_SECTION.KEY_METRICS)}
            onNotesChange={(notes) =>
                handleNotesChange(CANVAS_SECTION.KEY_METRICS, notes)
            }
        />

        <CanvasCard
            title="상위개념"
            isSubTitle
            notes={getNotes(CANVAS_SECTION.HIGH_LEVEL_CONCEPT)}
            onNotesChange={(notes) =>
                handleNotesChange(CANVAS_SECTION.HIGH_LEVEL_CONCEPT, notes)
            }
        />

        <CanvasCard
            title="9. 고객 경로"
            notes={getNotes(CANVAS_SECTION.CHANNELS)}
            onNotesChange={(notes) =>
                handleNotesChange(CANVAS_SECTION.CHANNELS, notes)
            }
        />

        <CanvasCard
            title="얼리 어답터"
            isSubTitle
            notes={getNotes(CANVAS_SECTION.EARLY_ADOPTERS)}
            onNotesChange={(notes) =>
                handleNotesChange(CANVAS_SECTION.EARLY_ADOPTERS, notes)
            }
        />
      </div>

      <div className="grid grid-cols-2">
        <CanvasCard
            title="7. 비용 구조"
            notes={getNotes(CANVAS_SECTION.COST_STRUCTURE)}
            onNotesChange={(notes) =>
                handleNotesChange(CANVAS_SECTION.COST_STRUCTURE, notes)
            }
        />

        <CanvasCard
            title="6. 수익 흐름"
            notes={getNotes(CANVAS_SECTION.REVENUE_STREAMS)}
            onNotesChange={(notes) =>
                handleNotesChange(CANVAS_SECTION.REVENUE_STREAMS, notes)
            }
        />
      </div>
    </div>
  );
}

export default LeanCanvas;
