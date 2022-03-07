import {
  render,
  waitFor,
  fireEvent,
  spySelector,
  mockTodos,
} from "src/util/test-utils";
import Drawer from "..";

const openDrawer = jest.fn(() => true);
const handleToggleDrawer = openDrawer.mockReturnValue(!openDrawer());

describe("Drawer component", () => {
  it("render component content when drawer is open and drawer wrapper container should have class 'open'", () => {
    const { getByText } = render(
      <Drawer
        openDrawer={openDrawer()}
        handleToggleDrawer={handleToggleDrawer}
      />
    );

    waitFor(() => {
      expect(
        document.querySelector(".drawer__wrapper.open")
      ).toBeInTheDocument();

      expect(getByText(/Completados/i)).toBeInTheDocument();
    });
  });

  it("when toggled the drawer, if it is open, should not render drawer content and drawer container should have class 'closed'", () => {
    const { getByText, getByTestId } = render(
      <Drawer
        openDrawer={openDrawer()}
        handleToggleDrawer={handleToggleDrawer}
      />
    );

    waitFor(() => {
      fireEvent.click(getByTestId("toggle-drawer-test"));

      expect(
        document.querySelector(".drawer__wrapper.closed")
      ).toBeInTheDocument();

      expect(getByText(/Completados/i)).not.toBeInTheDocument();
    });
  });
});

describe("Drawer with mocked redux data", () => {
  spySelector(mockTodos);

  it("should only show tasks that is completed", () => {
    const { getByText } = render(
      <Drawer
        openDrawer={openDrawer()}
        handleToggleDrawer={handleToggleDrawer}
      />
    );

    waitFor(() => {
      expect(getByText(mockTodos[0].task)).toBeInTheDocument();
      expect(getByText(mockTodos[1].task)).not.toBeInTheDocument();
    });
  });
});
