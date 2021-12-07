import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const PaginatorToolbar = (
  prevPage: CallableFunction,
  nextPage: CallableFunction
) => {
  const CharacterList = useSelector(
    (state: RootState) => state.CharacterList.value
  );
  return (
    <></>
    // <ButtonToolbar>
    //   <Button onClick={prevPage} variant="light" className="mx-2">
    //     PrevPage
    //   </Button>
    //   <div>
    //     <p style={{ color: "#f5f5f5" }}>
    //       Showing {page} of {CharacterList.info.pages}
    //     </p>
    //   </div>
    //   <Button onClick={nextPage} variant="light" className="mx-2">
    //     NextPage
    //   </Button>
    // </ButtonToolbar>
  );
};
