import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';

import {version} from '../../package.json';

interface Props {
  show: boolean;
  onHide: () => void;
}

export default function Info({show, onHide}: Props) {
  return (
    <Dialog open={show} onClose={onHide} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/40" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-h-full w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-xl">
          <div className="flex items-start justify-between border-b border-gray-200 px-6 py-4">
            <DialogTitle className="text-lg font-semibold">
              Easy Linavis: Simple Network Visualization for Literary Texts
            </DialogTitle>
            <button
              type="button"
              onClick={onHide}
              className="ml-4 text-2xl leading-none text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="space-y-4 px-6 py-4 text-sm">
            <p>
              Easy Linavis (<em>ezlinavis</em>) generates CSV files with network
              data from simple segmentations of dramatic texts. In the{' '}
              <strong>left column</strong>, you can list segments (chapters,
              acts, scenes, etc.) and characters appearing or speaking in a
              given segment. Segments are indicated with a hashtag and they can
              be hierarchical, e.g.:
            </p>
            <pre className="rounded bg-gray-100 p-2 text-xs">
              {'# First Act\n## First Scene\nCharacter 1\nCharacter 2\n…'}
            </pre>
            <p>
              This will automatically generate a CSV file with node-node
              relations (source, type, target, weight) in the{' '}
              <strong>column in the centre</strong>. Data changes as you type:
              as soon as you change something in the first column, the
              mid-column changes accordingly. The &quot;type&quot; column in the
              CSV file is always &quot;undirected&quot; here, but we inserted it
              so you can directly work with the CSV files in Gephi. The network
              graph in the <strong>right column</strong> is also generated live,
              using a spring-embedded layout, just to give you a first
              impression of what your network data looks like. To make it easier
              to understand how <em>ezlinavis</em> works, we provide some
              example files which can be accessed via the corresponding
              drop-down menu in the right upper corner.
            </p>
            <p>
              <em>ezlinavis</em> was developed in 2017 by Carsten Milling and
              Frank Fischer, using the React and Sigma JS libraries. It is
              mainly meant for didactic purposes (we are mainly resorting to it
              in our workshops on the network analysis of literary texts),
              although in principle it is also suited to handle bigger network
              data. If you want to contact us, please drop a line to
              fr.fischer(at)fu-berlin.de.
            </p>
            <p>
              <em>ezlinavis</em> is widely used in teaching, and several
              extensive tutorials and teaching modules are available (
              <a
                className="text-blue-600 hover:underline"
                href="https://doi.org/10.48694/fortext.3781"
              >
                doi:10.48694/fortext.3781
              </a>
              ,{' '}
              <a
                className="text-blue-600 hover:underline"
                href="https://doi.org/10.48694/fortext.3784"
              >
                doi:10.48694/fortext.3784
              </a>
              ).
            </p>
            <p>
              <em>ezlinavis</em> has also been used in research well beyond its
              originally intended use case, and we are always interested in
              learning more about its fields of application. Notable examples
              include linguistics (
              <a
                className="text-blue-600 hover:underline"
                href="https://doi.org/10.3726/JIG572_245"
              >
                doi:10.3726/JIG572_245
              </a>
              ) and medical research (
              <a
                className="text-blue-600 hover:underline"
                href="https://doi.org/doi:10.1007/s00432-022-04200-0"
              >
                doi:10.1007/s00432-022-04200-0
              </a>
              ,{' '}
              <a
                className="text-blue-600 hover:underline"
                href="https://doi.org/doi:10.21873/invivo.12976"
              >
                doi:10.21873/invivo.12976
              </a>
              ).
            </p>
            <p>
              <b>How to cite</b>
              <br />
              Frank Fischer, Carsten Milling: Easy Linavis (Simple Network
              Visualisation for Literary Texts). In: HDH2017: &quot;Sociedades,
              políticas, saberes&quot;. 18–20 October 2017. Málaga. Libro de
              resúmenes, pp. 173–176. (
              <a
                className="text-blue-600 hover:underline"
                href="https://doi.org/doi:10.5281/zenodo.10478399"
              >
                doi:10.5281/zenodo.10478399
              </a>
              )
            </p>
            <p className="text-xs text-gray-500">Version: {version}</p>
          </div>
          <div className="flex justify-end border-t border-gray-200 px-6 py-3">
            <button
              type="button"
              onClick={onHide}
              className="rounded bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
