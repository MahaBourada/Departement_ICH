import { Pencil, Plus, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex mt-20">
      <main className="w-[55%] mx-14">
        <form
          onSubmit={(e) => onSubmit(e)}
          className="flex items-center justify-between"
        >
          <h1 className="text-display font-semibold ">
            Comptes administrateurs
          </h1>

          <button
            type="submit"
            className="hover:translate-[1px] cursor-pointer mx-4"
          >
            <Plus size={36} color="#232323" strokeWidth={2.8} />
          </button>
        </form>
        <div className="mx-5">
          <div className="flex justify-between items-center my-3">
            <p>Anis ROJBI</p>
            <p>Super administrateur</p>
            <p>01/04/2025</p>
            <div className="flex items-center">
              <button
                type="button"
                className="cursor-pointer hover:translate-[1px] mr-1"
              >
                <Pencil size={26} color="#232323" />
              </button>
              <button
                type="button"
                className="cursor-pointer hover:translate-[1px] ml-1"
              >
                <Trash2 size={26} color="#8B0000" />
              </button>
            </div>
          </div>

          <div className="h-[0.5px] bg-black my-1 w-full"></div>

          <div className="flex justify-between items-center my-3">
            <p>Céline JOST</p>
            <p>Administrateur</p>
            <p>01/04/2025</p>
            <div className="flex items-center">
              <button
                type="button"
                className="cursor-pointer hover:translate-[1px] mr-1"
              >
                <Pencil size={26} color="#232323" />
              </button>
              <button
                type="button"
                className="cursor-pointer hover:translate-[1px] ml-1"
              >
                <Trash2 size={26} color="#8B0000" />
              </button>
            </div>
          </div>

          <div className="h-[0.5px] bg-black my-1 w-full"></div>

          <div className="flex justify-between items-center my-3">
            <p>Isis TRUCK</p>
            <p>Administrateur</p>
            <p>01/04/2025</p>
            <div className="flex items-center">
              <button
                type="button"
                className="cursor-pointer hover:translate-[1px] mr-1"
              >
                <Pencil size={26} color="#232323" />
              </button>
              <button
                type="button"
                className="cursor-pointer hover:translate-[1px] ml-1"
              >
                <Trash2 size={26} color="#8B0000" />
              </button>
            </div>
          </div>

          <div className="h-[0.5px] bg-black my-1 w-full"></div>
        </div>
      </main>
      <aside className="w-[30%]">
        <div>
          <h1 className="text-display font-semibold">Historique</h1>

          <div>
            <div className="flex justify-between items-center my-3">
              <p>Isis TRUCK</p>
              <p>01/04/2025</p>
              <p>20:35</p>
            </div>

            <div className="h-[0.5px] bg-black my-1 w-full"></div>

            <div className="flex justify-between items-center my-3">
              <p>Anis ROJBI</p>
              <p>01/04/2025</p>
              <p>20:35</p>
            </div>

            <div className="h-[0.5px] bg-black my-1 w-full"></div>

            <div className="flex justify-between items-center my-3">
              <p>Céline JOST</p>
              <p>01/04/2025</p>
              <p>20:35</p>
            </div>

            <div className="h-[0.5px] bg-black my-1 w-full"></div>
          </div>

          <div className="w-fit ml-auto mt-2 hover:underline hover:translate-[1px] font-semibold">
            <Link to="/admin/historique">Voir plus</Link>
          </div>
        </div>

        <div className="my-5">
          <h1 className="text-display font-semibold">Newsletter</h1>

          <div>
            <h2>Meow</h2>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DashboardPage;
